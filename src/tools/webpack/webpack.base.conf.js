const fs = require('fs');
const utils = require('../utils/utils');
const _CONFIG = require('../config');
const icons = require('../utils/get-icon-paths.js');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    app: `./${_CONFIG.directories.entry.scripts + _CONFIG.filenames.entry.js}`
  },

  output: {
    path: _CONFIG.resolve(_CONFIG.directories.output.public),
    filename: '[name].js'
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

  watch: _CONFIG.env.debug,

  module: {
    rules: [
      {
        test: _CONFIG.extensions.eslint,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [_CONFIG.resolve(_CONFIG.directories.entry.framework)],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },

      {
        test: _CONFIG.extensions.vue,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: (_CONFIG.env.debug) ? false : true,
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
        loader: 'babel-loader',
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

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: _CONFIG.env.mode }
    }),
    new ManifestPlugin({ // add manifest.json
      fileName: _CONFIG.filenames.entry.manifest,
      basePath: '',
      seed: {
        name: _CONFIG.app.name,
        short_name: _CONFIG.app.short_name,
        description: _CONFIG.app.description,
        icons: icons,
        start_url: "/",
        display: 'standalone',
        orientation: 'portrait',
        background_color: _CONFIG.app.background_color,
        theme_color:  _CONFIG.app.theme_color,
      }
    })
  ]
};
