const utils = require('../utils/utils');
const webpack = require('webpack');
const _CONFIG = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browsersync-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [`./${_CONFIG.directories.entry.server}hmr-client`].concat(baseWebpackConfig.entry[name]);
})

let webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false
    })
  },

  output: {
    chunkFilename: `[name].js`,
    publicPath: 'http://localhost/wordpress/wp-content/themes/vue-template/public/'
  },

  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new BrowserSyncPlugin({
      target: _CONFIG.server.target,
      open: _CONFIG.server.autoOpenBrowser,
      host: 'localhost',
      port: _CONFIG.server.port,
      //proxyUrl: _CONFIG.server.url + ':' + _CONFIG.server.port,
      watch: [],
      delay: 500,
    }),
    new WriteFilePlugin()
  ]
});

module.exports = webpackConfig;
