/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {},
    'postcss-preset-env': {
      stage: 2,
    },
  },
};

export default config;
