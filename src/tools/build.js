const rm = require('rimraf');
const webpack = require('webpack');
const _CONFIG = require('./config');
const webpackConfig = require(`./webpack/${_CONFIG.filenames.entry.webpack_config}`);

console.log(`building for ${_CONFIG.env.mode}...`);

rm(_CONFIG.resolve(_CONFIG.directories.output.assets), err => {

  if (err) {
    throw err;
  }

  webpack(webpackConfig, function (err, stats) {

    if (err) {
      throw err;
    }

    if(_CONFIG.env.debug === false) {
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      console.log('  Build complete.\n');
    }

  });

});
