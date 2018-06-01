/* eslint default-case:0 */
const browserSync = require('browser-sync').create();
const _CONFIG = require('./config');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require(`./webpack/${
  _CONFIG.filenames.entry.webpack_config
}`);

const bundler = webpack(webpackConfig);

// bundler.plugin('done', function(stats) {
//   if (stats.hasErrors() || stats.hasWarnings()) {
//       return browserSync.sockets.emit('fullscreen:message', {
//           title: 'Webpack Error:',
//           body: '',
//           timeout: 100000
//       });
//   }
//   browserSync.reload();
// });

browserSync.init({
  port: _CONFIG.server.port,

  // middleware: [
  //   webpackDevMiddleware(bundler, {
  //     publicPath: webpackConfig.output.publicPath,
  //     stats: { colors: true }
  //   })
  // ],

  files: [
    `${_CONFIG.directories.entry.assets}**/*.js`,
    `${_CONFIG.directories.entry.assets}**/*.scss`,
    `${_CONFIG.directories.root}**/*.php`,
    `!${_CONFIG.directories.output.classes}Config.php`
  ],

  proxy: {
    target: _CONFIG.server.dev_url,
  },

  ghostMode: {
    clicks: true,
    forms: true,
    scroll: true
  },

  open: _CONFIG.server.autoOpenBrowser,

  notify: { styles: ['display: none;'] }
});