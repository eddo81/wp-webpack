const sortChunks = require('webpack-sort-chunks').default;
const flatten = require('lodash/flatten');
const flatMap = require('lodash/flatMap');
const _CONFIG = require('../config');

function sortAssets(stats) {
  const chunks = flatten(sortChunks(stats.chunks).map(chunk => chunk.files));
  const assets = flatMap(stats.assetsByChunkName).sort((a, b) => chunks.indexOf(a) > chunks.indexOf(b) ? 1 : -1);
  return assets;
};

function getAssetsByType(assets, type, prependPath = '') {

  const assetsByType = [].concat(assets)
  .filter((asset) => new RegExp(`${type}$`)
  .test(asset))
  .map((asset) => prependPath + asset);
  return assetsByType;
}

// Setup the plugin instance with options...
function SortAssetsPlugin(callback) {
  this.callback = callback;
}

/**
 * Save assets by type (js, css)
 */
SortAssetsPlugin.prototype.apply = function(compiler) {

  compiler.plugin('done', (stats) => {
    const { output } = compiler.options;
    const assets = sortAssets(stats.toJson({ modules: false }));
    const assetsByType = {
      //js: getAssetsByType(assets, 'js', output.publicPath),
      //css: getAssetsByType(assets, 'css', output.publicPath)
      js: getAssetsByType(assets, 'js', `/${_CONFIG.directories.output.public}`),
      css: getAssetsByType(assets, 'css', `/${_CONFIG.directories.output.public}`)
    };
    this.callback(assetsByType);
  });
};

module.exports = SortAssetsPlugin;
