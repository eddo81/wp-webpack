const utils = require('../utils/utils');
const webpack = require('webpack');
const _CONFIG = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const BrowserSyncPlugin = require('browsersync-webpack-plugin');

//add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [`./${_CONFIG.directories.entry.server}hmr-client`].concat(baseWebpackConfig.entry[name]);
});

baseWebpackConfig.module.rules.forEach(function (rule) {
  if(rule.test === _CONFIG.extensions.js && Array.isArray(rule.loaders)) {
    rule.loaders.push(_CONFIG.resolve(`${_CONFIG.directories.entry.plugins}module-hot-accept-plugin`));
  }
});

let webpackConfig = merge(baseWebpackConfig, {

  module: {
    rules: utils.styleLoaders({
      sourceMap: false
    })
  },

  output: {
    chunkFilename: `[name].js`,
    pathinfo: true,
    publicPath: _CONFIG.server.public_path
  },

  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new BrowserSyncPlugin({
      target: _CONFIG.server.dev_url,
      open: _CONFIG.server.autoOpenBrowser,
      proxyUrl: _CONFIG.server.proxy_url,
      advanced: {
        browserSync: {

          files: [
            `${_CONFIG.directories.output.app}**/*.php`,
            `!${_CONFIG.directories.output.classes + _CONFIG.filenames.output.php}`,
          ],

          ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
          },

          notify: { styles: ['display: none;'] }
        }
      }
    })
  ]
});

module.exports = webpackConfig;
