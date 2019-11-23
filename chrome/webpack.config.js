const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
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
        test: /\.vue/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true, // 型チェックしない
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
    extensions: ['.ts', '.tsx', '.js']
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },

  devtool: 'source-map'
};
