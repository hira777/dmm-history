const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    historySaver: './src/chrome/historySaver.js',
    histories: './src/vue/histories.js',
    popup: './src/chrome/popup.js'
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
    }
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
