/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = (env, argv) => {
  const historyDevServer = Boolean(env.historyDevServer);

  return {
    context: __dirname,

    entry: {
      historySaver: './src/chrome/historySaver.ts',
      histories: './src/react/histories.tsx',
      popup: './src/chrome/popup.ts'
    },

    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
      publicPath: historyDevServer ? '/build/' : 'auto'
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        }
      ]
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      },
      extensions: ['.tsx', '.ts', '.js']
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

    devServer: {
      static: {
        directory: __dirname
      },
      devMiddleware: {
        publicPath: '/build/'
      },
      open: ['/history.html'],
      host: '127.0.0.1',
      port: 8080
    },

    plugins: [
      new webpack.DefinePlugin({
        __DMM_HISTORY_USE_MOCK__: JSON.stringify(historyDevServer)
      })
    ]
  };
};
