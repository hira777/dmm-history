const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    // 生成物と依存パッケージはチェック対象から外す
    ignores: ['chrome/build/**', 'dist/**', 'node_modules/**']
  },
  // JavaScriptの基本的な推奨ルールを使う
  js.configs.recommended,
  // TypeScript向けの推奨ルールを使う
  ...tseslint.configs.recommended,
  // Prettierと競合する整形ルールを無効にする
  eslintConfigPrettier,
  {
    // Chrome拡張のTypeScript/Reactコードをチェックする
    files: ['chrome/src/**/*.{ts,tsx}'],
    languageOptions: {
      // 最新のJavaScript構文を扱う
      ecmaVersion: 'latest',
      // import/exportを使う
      sourceType: 'module',
      globals: {
        // Chrome拡張APIとブラウザのグローバル変数を許可する
        chrome: 'readonly',
        document: 'readonly',
        window: 'readonly',
        console: 'readonly'
      }
    }
  }
];
