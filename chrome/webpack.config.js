/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = (env, argv) => {
  return {
    entry: {
      historySaver: './src/chrome/historySaver.ts',
      histories: './src/vue/histories.ts',
      popup: './src/chrome/popup.ts'
    },

    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js'
    },

    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.vue/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            // transpileOnly: true, // 型チェックしない
            appendTsSuffixTo: [/\.vue$/],
            configFile: 'tsconfig.json'
          }
        }
      ]
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        vue$: 'vue/dist/vue.esm.js'
      },
      extensions: ['.ts', '.js', '.vue']
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              /* eslint-disable @typescript-eslint/camelcase */
              drop_console: true // consoleを削除する
              /* eslint-enable @typescript-eslint/camelcase */
            }
          }
        })
      ]
    },

    devtool:
      argv.mode === 'development' ? 'inline-cheap-module-source-map' : false,

    plugins: [new VueLoaderPlugin()]
  };
};
