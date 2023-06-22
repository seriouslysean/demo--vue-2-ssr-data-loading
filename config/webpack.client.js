const webpack = require('webpack');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = require('./webpack.base');

const projectRoot = resolve(__dirname, '..');

module.exports = merge(baseConfig, {
  entry: resolve(projectRoot, 'src/entry-client.js'),
  output: {
    filename: 'entry-client.bundle.js',
  },
  plugins: [
    new VueSSRClientPlugin(),
  ],
});
