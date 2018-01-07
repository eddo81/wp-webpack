const fs = require('fs');
const utils = require('../utils/utils');
const _CONFIG = require('../config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      'process.env': { NODE_ENV: _CONFIG.env.mode, CONFIG: JSON.stringify(require('../config').prod) }
    }),

    new HtmlWebpackPlugin({
      filename: `${(_CONFIG.env.debug === true) ? '' : _CONFIG.resolve(_CONFIG.directories.output.public + '/')}` + _CONFIG.filenames.output.html,
      template: `${_CONFIG.directories.entry.src + _CONFIG.filenames.entry.html}`,
      inject: true,
      minify: (_CONFIG.env.debug === true) ? undefined : {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      config: _CONFIG,
      serviceWorkerLoader: `<script id="serviceworkerloader">(function(){'use strict'; ${(_CONFIG.env.debug === true)?'':'var swEntry = "'+_CONFIG.filenames.output.serviceworker+'";'}${fs.readFileSync(_CONFIG.resolve(_CONFIG.directories.entry.serviceworker + _CONFIG.filenames.entry.serviceworker), 'utf-8')}})();</script>`
    })
  ]
};
