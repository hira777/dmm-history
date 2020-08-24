/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = (env, argv) => {
  return {
    entry: {
      historySaver: './src/chrome/historySaver.ts',
      // histories: '',
      popup: './src/chrome/popup.ts',
    },

    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            // transpileOnly: true, // 型チェックしない
            configFile: 'tsconfig.json',
          },
        },
      ],
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.ts', '.js'],
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              /* eslint-disable @typescript-eslint/camelcase */
              drop_console: true, // consoleを削除する
              /* eslint-enable @typescript-eslint/camelcase */
            },
          },
        }),
      ],
    },

    devtool:
      argv.mode === 'development' ? 'inline-cheap-module-source-map' : false,
  };
};
