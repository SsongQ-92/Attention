import archiver from 'archiver';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import esbuild from 'esbuild';
import fs from 'fs-extra';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';

const outdir = 'build';

const deleteOldDir = async () => {
  await fs.remove(outdir);
};

const buildCSS = async () => {
  const css = `
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css');
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer utilities {
      .flex-center {
        @apply flex flex-row items-center justify-center;
      }
      .flex-col-center {
        @apply flex flex-col items-center justify-center;
      }
    }
  `;

  const result = await postcss([
    tailwindcss,
    autoprefixer,
    cssnano({
      preset: 'default',
    }),
    postcssPresetEnv({
      stage: 2,
      autoprefixer: { grid: true },
    }),
  ]).process(css, { from: undefined });

  return result.css;
};

const runEsbuild = async (inlineCSS) => {
  await esbuild.build({
    entryPoints: [
      'src/content-script/index.tsx',
      'src/content-script/injected-customElements-script.ts',
      'src/background/index.ts',
    ],
    bundle: true,
    outdir: outdir,
    treeShaking: true,
    minify: true,
    legalComments: 'none',
    jsx: 'automatic',
    define: {
      'process.env.INLINE_CSS': JSON.stringify(inlineCSS),
    },
  });
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
  const inlineCSS = await buildCSS();
  await runEsbuild(inlineCSS);

  const commonFiles = [
    { src: 'build/content-script/index.js', dst: 'content-script.js' },
    {
      src: 'build/content-script/injected-customElements-script.js',
      dst: 'injected-customElements-script.js',
    },
    { src: 'build/background/index.js', dst: 'background.js' },
    { src: 'src/assets', dst: 'assets' },
    { src: 'src/manifest.json', dst: 'manifest.json' },
  ];

  for (const file of commonFiles) {
    await fs.copy(file.src, `./${outdir}/chromium/${file.dst}`);
  }

  await zipFolder(`./${outdir}/chromium`);

  console.log('Build success.');
};

build();
