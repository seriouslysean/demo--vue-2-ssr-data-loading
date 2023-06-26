const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const { environment, paths, isProd } = require('./config');

module.exports = {
  mode: environment,
  devtool: 'inline-source-map',
  output: {
      path: paths.dist,
      publicPath: '/',
      filename: isProd ? '[name].[contenthash].js' : '[name].js',
      chunkFilename: isProd
          ? 'async/[name].[contenthash].js'
          : 'async/[name].js',
  },
  resolve: {
      alias: {
          '~': paths.src,
          '~components': join(paths.src, 'components'),
          '~routes': join(paths.src, 'routes'),
      },
      extensions: ['.js', '.ts', '.d.ts'],
  },
  module: {
      rules: [
          {
              test: /\.vue$/,
              loader: 'vue-loader',
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader',
            ],
          },
      ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
