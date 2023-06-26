// Copied from https://github.com/xrei/vue-ssr/blob/master/template/build/setup-dev-server.js
const { readFileSync } = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const chokidar = require('chokidar');
const MFS = require('memory-fs');
const webpack = require('webpack');

const { files } = require('./config');

module.exports = function setupDevServer(app, templatePath, cb) {
    const mfs = new MFS();
    let template;
    let serverBundle;
    let clientManifest;
    let ready;

    const clientConfig = require('./webpack.client');
    const serverConfig = require('./webpack.server');

    const readyPromise = new Promise((r) => { ready = r; });
    const update = () => {
        if (serverBundle && clientManifest) {
            ready({ clientManifest });
            cb(serverBundle, {
                template,
                clientManifest,
            });
        }
    };

    // read template from disk and watch
    template = readFileSync(templatePath, 'utf-8');
    chokidar.watch(templatePath).on('change', () => {
        console.error('Template file updated');
        template = readFileSync(templatePath, 'utf-8');
        update();
    });

    // modify client config to work with hot middleware
    clientConfig.entry.app = [
        'webpack-hot-middleware/client?reload=true&quiet=false',
        clientConfig.entry.app,
    ];
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    );

    // Launch the client webpack build and update with the clientManifest
    console.log('Launching client webpack build');
    const clientCompiler = webpack(clientConfig);
    clientCompiler.outputFileSystem = mfs;
    app.use(webpackDevMiddleware(clientCompiler, {
        outputFileSystem: mfs,
        publicPath: clientConfig.output.publicPath,
        stats: { colors: true },
    }));
    app.use(webpackHotMiddleware(clientCompiler, {
        path: '/__webpack_hmr',
        heartbeat: 5 * 1000,
    }));

    clientCompiler.hooks.done.tap('setup-dev-server', (stats) => {
        console.log('Completed client webpack build');
        if (stats.toJson().errors.length) {
            return;
        }

        // Update the manifest for the app
        clientManifest = JSON.parse(mfs.readFileSync(files.clientManifest, 'utf-8'));
        update();
    });

    // Launch the server webpack build and update with the serverBundle
    console.log('Launching server webpack build');
    const serverCompiler = webpack(serverConfig);
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        console.log('Completed server webpack build');
        if (err) {
            throw err;
        }

        if (stats.toJson().errors.length) {
            return;
        }

        // Update the server bundle for the app
        serverBundle = JSON.parse(mfs.readFileSync(files.serverBundle, 'utf-8'));
        update();
    });

    return readyPromise;
}
