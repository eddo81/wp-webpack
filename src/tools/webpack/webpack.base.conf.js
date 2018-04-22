const fs = require('fs');
const utils = require('../utils/utils');
const _CONFIG = require('../config');
const icons = require('../utils/get-icon-paths.js');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const SortAssetsPlugin = require('./plugins/sort-assets-plugin.js');
const InjectAssets = require('../utils/inject-assets.js');

module.exports = {
  entry: {
    app: `./${_CONFIG.directories.entry.scripts + _CONFIG.filenames.entry.js}`
  },

  output: {
    path: _CONFIG.resolve(_CONFIG.directories.output.assets),
    filename: `${_CONFIG.directories.output.js}[name].js`,
    publicPath: _CONFIG.server.public_path
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': _CONFIG.resolve(_CONFIG.directories.entry.framework),
      'assets': _CONFIG.resolve(_CONFIG.directories.entry.assets)
    }
  },

  devtool: (_CONFIG.env.debug) ? '#cheap-module-eval-source-map' : '#source-map',

  watch: (_CONFIG.env.debug),

  module: {
    rules: [
      {
        test: new RegExp(`${_CONFIG.extensions.js.source}|${_CONFIG.extensions.vue.source}`),
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [_CONFIG.resolve(_CONFIG.directories.entry.framework), _CONFIG.resolve(_CONFIG.directories.entry.scripts)]
      },

      {
        test: new RegExp(`${_CONFIG.extensions.js.source}|${_CONFIG.extensions.scss.source}`),
        loader: 'import-glob',
        enforce: 'pre',
        include: [_CONFIG.resolve(_CONFIG.directories.entry.assets)]
      },

      {
        test: _CONFIG.extensions.vue,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: (!_CONFIG.env.debug),
            extract: (!_CONFIG.env.debug)
          }),
          transformToRequire: {
            video: 'src',
            source: 'src'
          }
        }
      },

      {
        test: _CONFIG.extensions.js,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: [_CONFIG.resolve(_CONFIG.directories.entry.framework), _CONFIG.resolve(_CONFIG.directories.entry.scripts)]
      },

      {
        test: _CONFIG.extensions.images,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${_CONFIG.directories.output.images}[name].[hash:7].[ext]`
        }
      },

      {
        test: _CONFIG.extensions.media,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${_CONFIG.directories.output.media}[name].[hash:7].[ext]`
        }
      },

      {
        test: _CONFIG.extensions.fonts,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${_CONFIG.directories.output.fonts}[name].[hash:7].[ext]`
        }
      }
    ]
  },

  externals: {
    jquery: 'jQuery',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: _CONFIG.env.mode }
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: 'popper.js/dist/umd/popper.js',
    }),

    new SortAssetsPlugin((assetsByType) => { InjectAssets(assetsByType); }, `/${_CONFIG.directories.output.assets}`),

    new ManifestPlugin({
      fileName: _CONFIG.filenames.entry.manifest,
      basePath: '',
      seed: {
        name: _CONFIG.theme.name,
        short_name: _CONFIG.theme.name,
        description: _CONFIG.theme.description,
        icons: icons,
        start_url: "/",
        display: 'standalone',
        orientation: 'portrait',
        background_color:_CONFIG.theme.background_color,
        theme_color:  _CONFIG.theme.theme_color,
      }
    })
  ]
};
