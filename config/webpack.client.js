const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.js')
const paths = require('./paths')

module.exports = merge(baseConfig, {
  entry: paths.src + '/entry-client.js',
})
