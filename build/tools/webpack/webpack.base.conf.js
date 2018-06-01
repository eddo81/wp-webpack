const fs = require('fs');
const _WRITE = require('write');
const _CONFIG = require('../config');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('./plugins/write-file-plugin');
const SortAssetsPlugin = require('./plugins/sort-assets-plugin');
const writeFile = require('../utils/write-file.js');

module.exports = {
  entry: {
    app: `./${_CONFIG.directories.entry.scripts + _CONFIG.filenames.entry.js}`
  },

  output: {
    path: _CONFIG.resolve(_CONFIG.directories.output.assets),
    filename: `${_CONFIG.directories.output.js}[name].[hash].js`,
    publicPath: _CONFIG.server.public_path
  },

  resolve: {
    extensions: ['.css', '.scss', '.js', '.json'],
    alias: {
      assets: _CONFIG.resolve(_CONFIG.directories.entry.assets)
    }
  },

  module: {
    rules: [
      {
        test: new RegExp(
          `${_CONFIG.extensions.js.source}`
        ),
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          _CONFIG.resolve(_CONFIG.directories.entry.scripts)
        ]
      },

      {
        test: new RegExp(
          `${_CONFIG.extensions.js.source}|${_CONFIG.extensions.scss.source}`
        ),
        loader: 'import-glob',
        enforce: 'pre',
        include: [_CONFIG.resolve(_CONFIG.directories.entry.assets)]
      },

      {
        test: _CONFIG.extensions.js,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: [
          _CONFIG.resolve(_CONFIG.directories.entry.scripts)
        ]
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
      },

      { 
        test: new RegExp(`${_CONFIG.extensions.css}|${_CONFIG.extensions.postcss}`),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader' 
        ] 
      },

      { 
        test: _CONFIG.extensions.scss,
        use: [
          MiniCssExtractPlugin.loader,  
          'css-loader',
          'postcss-loader',
          'sass-loader'        
        ] 
      }
    ]
  },

  externals: {
    jquery: 'jQuery'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: _CONFIG.env.mode }
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: 'popper.js/dist/umd/popper.js'
    }),

    new MiniCssExtractPlugin({
      filename: `${_CONFIG.directories.output.css}[name].[contenthash].css`,
      chunkFilename: '[id].css'
    }),

    new SortAssetsPlugin(
      { prependPath: `/${_CONFIG.directories.output.assets}` },
      assetsByType => {
        const template_variables = {
          text_domain: _CONFIG.theme.text_domain,
          env: _CONFIG.env,
          assets: assetsByType
        };

        writeFile(
          _CONFIG.resolve(
            `${_CONFIG.directories.output.classes}Config.php`
          ),
          require('./plugins/write-file-plugin/templates/php-class-template.js')(
            template_variables
          )
        );
      }
    ),

    new WriteFilePlugin({
      filePath: _CONFIG.resolve('style.css'),
      fileContents: require('./plugins/write-file-plugin/templates/style-css-template.js')(
        _CONFIG.theme
      )
    })
  ]
};
