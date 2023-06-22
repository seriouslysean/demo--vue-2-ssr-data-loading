const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer')

const paths = require('../../../config/paths')
const createApp = require('../../entry-server');

const app = express();

const htmlTemplate = paths.src + '/modules/server/index.template.html';
const serverBundle = paths.dist + '/vue-ssr-server-bundle.json';

const { renderToString } = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommended
  template: htmlTemplate, // (optional) page template
  // clientManifest // (optional) client build manifest
})

app.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)

  renderToString(app, (err, html) => {
    // handle error...
    res.end(html)
  })
})

app.listen(3000);
