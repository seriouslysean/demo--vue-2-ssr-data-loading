const { resolve } = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const projectRoot = resolve(__dirname, '..');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const environment = isProd ? 'production' : 'development';

module.exports = {
  mode: environment,
  output: {
      path: resolve(projectRoot, 'dist'),
      publicPath: '/',
      filename: isProd ? '[name].[contenthash].js' : '[name].js',
      chunkFilename: isProd
          ? 'async/[name].[contenthash].js'
          : 'async/[name].js',
  },
  resolve: {
      alias: {
          '~': resolve(projectRoot, 'src'),
          '~components': resolve(projectRoot, 'src/components'),
          '~routes': resolve(projectRoot, 'src/routes'),
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
              'css-loader'
            ]
          }
      ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
