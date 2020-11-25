// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "no-case-declarations": 0,
    "no-constant-condition": 0,
    "no-console": 1,
    "eqeqeq": 2,
    "@typescript-eslint/no-shadow": 2,
    "semi": 1,
    "comma-dangle": [1, "always-multiline"],
    "sort-imports": [1, {
      "ignoreDeclarationSort": true,
    }],
    "no-trailing-spaces": 1,
    "eol-last": 1,
    "max-len": [2, {
      "code": 120,
      "tabWidth": 2,
      "ignoreUrls": true,
    }],
  },
};
