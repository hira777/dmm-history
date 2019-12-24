module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser を parserOptions 内に記述しないとエラーが発生する
    // https://vuejs.github.io/eslint-plugin-vue/user-guide/#faq
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
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
