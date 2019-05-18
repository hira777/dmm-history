module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2017
  },
  extends: ['eslint:recommended','plugin:vue/recommended', 'plugin:prettier/recommended'],
  plugins: ['vue'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true
      }
    ]
  },
  globals: {
    chrome: true
  }
};
