const utils = require('../utils/utils');
const webpack = require('webpack');
const _CONFIG = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

let webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',

  module: { rules: utils.styleLoaders({ sourceMap: true, extract: true }) },

  output: {
    filename: `${_CONFIG.directories.output.js}[name].[chunkhash].js`,
    chunkFilename: `${_CONFIG.directories.output.js}[name]_[id].[chunkhash].js`
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false, drop_console: true },
      mangle: { except: ['$', 'exports', 'require'] },
      sourceMap: true
    }),

    // extract css into its own file
    new ExtractTextPlugin({
      filename: `${_CONFIG.directories.output.css}[name].[contenthash].css`
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    new ImageminPlugin({
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: {
        plugins: [{ removeUnknownsAndDefaults: false }, { cleanupIDs: false }]
      },
      plugins: [imageminMozjpeg({ quality: 75 })]
    }),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          _CONFIG.extensions.js.test(module.resource) &&
          module.resource.indexOf(_CONFIG.resolve('node_modules')) === 0
        );
      }
    }),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
});

module.exports = webpackConfig;
