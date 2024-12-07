/**
 * @type {import('prettier').Options}
 */

export default {
  trailingComma: 'es5',
  semi: true,
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['^(react/(.*)$)|^(react$)', '', '<THIRD_PARTY_MODULES>', '', '^[./]'],
};
