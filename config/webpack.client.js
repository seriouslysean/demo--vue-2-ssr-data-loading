const webpack = require('webpack');
const { join } = require('path');
const { merge } = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const { paths, isProd } = require('./config');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  entry: join(paths.src, 'entry-client.js'),
  output: {
    filename: 'entry-client.bundle.js',
  },
  plugins: [
    new VueSSRClientPlugin(),
  ],
});
