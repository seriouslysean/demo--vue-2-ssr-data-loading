const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const paths = require('./paths')

const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'production'

module.exports = {
  mode: NODE_ENV,
  // entry defined in client config
  devtool: isProd
    ? 'source-map'
    : 'cheap-module-source-map',
  output: {
    path: paths.dist,
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'components': resolve(__dirname, '../src/components'),
    }
  },
  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vue SSR',
      template: paths.src + '/modules/server/index.template.html', // template file
      filename: 'index.html', // output file
    }),
  ]
}
