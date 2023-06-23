const { readFileSync } = require('fs');
const { resolve } = require('path');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer')

const app = express();

const template = readFileSync(resolve(__dirname, 'index.template.html'), 'utf-8');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

// TODO Move this to a public dir and copy files
app.use('/entry-client.bundle.js', (req, res) => res.sendFile(
  resolve(__dirname, '../dist/entry-client.bundle.js'),
));

app.get('*', (req, res) => {
  const context = { url: req.url };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      throw new Error(err);
    }
    res.end(html);
  });
});

app.listen(3000);
