const utils = require('../utils/utils');
const webpack = require('webpack');
const _CONFIG = require('../config');
const _SEED = require('../manifest');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

let webpackConfig = merge(baseWebpackConfig, {

  module: { rules: utils.styleLoaders({ sourceMap: true, extract: true }) },

  output: {
    path: `${_CONFIG.directories.root + _CONFIG.directories.output.public}`,
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

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (module.resource && _CONFIG.extensions.js.test(module.resource) && module.resource.indexOf(_CONFIG.resolve('node_modules')) === 0)
      }
    }),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: _CONFIG.resolve(_CONFIG.directories.entry.static.replace(/\/$/,'')),
        to: '',
        ignore: ['.*']
      }
    ]),

    // add manifest.json
    new ManifestPlugin({
      fileName: _CONFIG.filenames.entry.manifest,
      basePath: '',
      seed: _SEED
    }),

    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: _CONFIG.package.name.replace(/\s/g, '-'),
      filename: _CONFIG.filenames.output.serviceworker,
      staticFileGlobs: [`${_CONFIG.directories.output.public}/**/*.{js,html,css,woff,woff2,ttf,webp,png,jpg,jpeg,gif,svg,ico}`],
      minify: true,
      stripPrefix: `${_CONFIG.directories.output.public}/`
    }),

    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});

module.exports = webpackConfig;
