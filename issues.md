# 開発中に遭遇した問題

## `tsconfig.json`がプロジェクトのルートディレクトリにないと、Storybook の Actions アドオンが動作しない

ビルドは成功するが、アクションがログに出力されない。

ルートディレクトリというよりも、`.storybook`と同じ階層にないと動作しない？

### 解決策

結局、ルートに以下の`tsconfig.json`を置かないと動作しなかった。

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

### 試したこと

Storybook が、このプロジェクトの`chrome/tsconfig.json`を読み込めていないのが原因だと思ったので、以下のような対応を行った

#### `.storybook/main.js`に TypeScript の設定をオーバーライド

`.storybook/main.js`

```js
module.exports = {
  // 省略...
  typescript: {
    typescript: {
      check: true,
      checkOptions: {
        tsconfig: path.resolve(__dirname, '../chrome/tsconfig.json'),
      },
    },
  },
};
```

型チェックが有効になる、ビルドは成功するが、問題は解決されなかった。

#### Storybook の webpack の設定を追加

`.storybook/main.js`

その１

```js
const path = require('path');

module.exports = {
  // 省略...
  webpackFinal: async config => {
    config.module.rules.push({
      include: path.resolve(__dirname, '../chrome/'),
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname, '../chrome/tsconfig.json'),
      },
    });

    return config;
  },
};
```

その２

```js
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  // 省略...
  webpackFinal: async config => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../chrome/tsconfig.json'),
      }),
    ];

    return config;
  },
};
```

特に動作は変わらず、問題は解決されなかった。

#### `@storybook/preset-typescript`の設定をオーバーライド

`.storybook/main.js`

```js
const path = require('path');

module.exports = {
  // 省略...
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        forkTsCheckerWebpackPluginOptions: {
          tsconfig: path.resolve(__dirname, '../chrome/tsconfig.json'),
        },
      },
    },
  ],
};
```

以下のようなエラーが発生した。

```shell
ERROR in ./.storybook/storybook-init-framework-entry.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: Duplicate plugin/preset detected.
If you'd like to use two separate instances of a plugin,
they need separate names, e.g.

  plugins: [
    ['some-plugin', {}],
    ['some-plugin', {}, 'some unique name'],
  ]

Duplicates detected are:
```

`@storybook/preset-typescript`は TypeScript のトランスパイルは`@babel/preset-typescript`で行っている。

https://storybook.js.org/docs/react/configure/typescript

そのため、それに関連する Babel のエラーだと思われる。

そもそも、`@babel/preset-typescript`は`tsconfig.json`を参照しないはずだったので、今回のエラーが発生している原因が謎。

`@storybook/preset-typescript`の内部処理が原因かもしれない。
