const webpack = require('webpack');
const _CONFIG = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

let webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',

  devtool: '#cheap-module-eval-source-map',

  watch: true,
  
  output: {
    chunkFilename: `[name].js`,
    pathinfo: true,
    publicPath: _CONFIG.server.public_path,
    hotUpdateChunkFilename: 'hot-update.js',
    hotUpdateMainFilename: 'hot-update.json'
  },

  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ]
});

module.exports = webpackConfig;
