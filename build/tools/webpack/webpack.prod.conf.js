const webpack = require('webpack');
const _CONFIG = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

  devtool: '#source-map',

  watch: false,

  output: {
    filename: `${_CONFIG.directories.output.js}[name].[chunkhash].js`,
    chunkFilename: `${_CONFIG.directories.output.js}[name]_[id].[chunkhash].js`
  },

  plugins: [
    new ImageminPlugin({
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: {
        plugins: [{ removeUnknownsAndDefaults: false }, { cleanupIDs: false }]
      },
      plugins: [imageminMozjpeg({ quality: 75 })]
    })
  ],

  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        vendor: {
          chunks: "initial",
          minChunks: 3,
          name: "vendor",
          enforce: true
        }
      }
    },

    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: { comments: false },
          compress: { warnings: false, drop_console: true },
          mangle: { reserved: ['$', 'exports', 'require'] },
        }
      }),

      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ],

    noEmitOnErrors: true
  }
});

module.exports = webpackConfig;
