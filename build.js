import archiver from 'archiver';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import * as dotenv from 'dotenv';
import esbuild from 'esbuild';
import postcssPlugin from 'esbuild-style-plugin';
import fs from 'fs-extra';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';

dotenv.config();

const outdir = 'build';

const deleteOldDir = async () => {
  await fs.remove(outdir);
};

const runEsbuild = async () => {
  await esbuild.build({
    entryPoints: ['src/content-script/index.tsx', 'src/background/index.ts'],
    bundle: true,
    outdir: outdir,
    treeShaking: true,
    minify: true,
    legalComments: 'none',
    define: {
      'process.env.NODE_ENV': 'production',
    },
    jsx: 'automatic',
    loader: {
      '.png': 'dataurl',
      '.svg': 'file',
    },
    plugins: [
      postcssPlugin({
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer,
            cssnano({
              preset: 'default',
            }),
            postcssPresetEnv({
              stage: 2,
              autoprefixer: { grid: true },
            }),
          ],
        },
      }),
    ],
  });
};

const copyFiles = async (entryPoints, targetDir) => {
  await fs.ensureDir(targetDir);
  await Promise.all(
    entryPoints.map(async (entryPoint) => {
      await fs.copy(entryPoint.src, `${targetDir}/${entryPoint.dst}`);
    })
  );
};

const zipFolder = async (dir) => {
  const output = fs.createWriteStream(`${dir}.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });
  archive.pipe(output);
  archive.directory(dir, false);
  await archive.finalize();
};

const build = async () => {
  await deleteOldDir();
  await runEsbuild();

  const commonFiles = [
    { src: 'build/content-script/index.js', dst: 'content-script.js' },
    { src: 'build/content-script/index.css', dst: 'content-script.css' },
    { src: 'build/background/index.js', dst: 'background.js' },
  ];

  await copyFiles(
    [...commonFiles, { src: 'src/manifest.json', dst: 'manifest.json' }],
    `./${outdir}/chromium`
  );

  await zipFolder(`./${outdir}/chromium`);

  console.log('Build success.');
};

build();
