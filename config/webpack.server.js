const { join } = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.base');

const projectRoot = join(__dirname, '..');

module.exports = merge(baseConfig, {
    target: 'node',
    entry: join(projectRoot, 'src/entry-server.js'),
    output: {
        libraryTarget: 'commonjs2',
        filename: 'entry-server.bundle.js',
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // Externalize app dependencies. This makes the server build much faster
    // and generates a smaller bundle file.
    externals: nodeExternals({
        // do not externalize dependencies that need to be processed by webpack.
        // you can add more file types here e.g. raw *.vue files
        // you should also allowlist deps that modifies `global` (e.g. polyfills)
        allowlist: /\.css$/
    }),
    plugins: [
        new VueSSRServerPlugin(),
    ],
});
