const { join } = require('path');

const projectRoot = join(__dirname, '..');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const environment = isProd ? 'production' : 'development';

module.exports = {
    environment,
    isProd,
    paths: {
        root: projectRoot,
        config: join(projectRoot, 'config'),
        dist: join(projectRoot, 'dist'),
        src: join(projectRoot, 'src'),
    },
    files: {
        clientManifest: join(projectRoot, 'dist/vue-ssr-client-manifest.json'),
        serverBundle: join(projectRoot, 'dist/vue-ssr-server-bundle.json'),
        template: join(projectRoot, 'src/index.template.html'),
    },
};
