require('./utils/check-versions')();

const rm = require('rimraf');
const webpack = require('webpack');
const _CONFIG = require('./config');
const webpackConfig = require('./webpack/webpack.prod.conf');

console.log('building for production...');

rm(_CONFIG.resolve(_CONFIG.directories.output.public), err => {

  if (err) {
    throw err;
  }

  webpack(webpackConfig, function (err, stats) {

    if (err) {
      throw err;
    }

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log('  Build complete.\n');

    console.log('  Tip: built files are meant to be served over an HTTP server.\n' + '  Opening index.html over file:// won\'t work.\n');
  });
})
