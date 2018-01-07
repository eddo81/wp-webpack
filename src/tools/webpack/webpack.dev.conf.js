const utils = require('../utils/utils');
const webpack = require('webpack');
const _CONFIG = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [`./${_CONFIG.directories.entry.server}dev-client`].concat(baseWebpackConfig.entry[name]);
})

let webpackConfig = merge(baseWebpackConfig, {
  module: { rules: utils.styleLoaders({ sourceMap: false }) },

  output: { chunkFilename: `[name].js` },

  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
});

module.exports = webpackConfig;
