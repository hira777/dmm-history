const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
          // consoleを削除する設定
          compress: { drop_console: true }
        }
      })
    ]
  },

  devtool: 'source-map',

  plugins: [new VueLoaderPlugin()]
};
