'use strict';

const sortChunks = require('webpack-sort-chunks').default;
const extensions = {
  js:  /\.(js|es6)$/i,
  css: /\.css$/i,
};

function sortAssets(stats) {
  const chunks = sortChunks(stats.chunks).map(chunk => chunk.files).reduce((a, b) => a.concat(b), []);
  return Object.keys(stats.assetsByChunkName)
    .reduce((initialValue, currentValue) => { return initialValue.concat(stats.assetsByChunkName[currentValue]) }, [])
    .sort((a, b) => chunks.indexOf(a) > chunks.indexOf(b) ? 1 : -1);
};

function getAssetsByType(assets, type, prependPath) {
  return [].concat(assets).filter((asset) => new RegExp(type).test(asset)).map((asset) => prependPath + asset);
}

// Setup the plugin instance with options...
function SortAssetsPlugin(options = {prependPath: ''}, callback) {
  this.callback = callback;
  this.options = options;
}

/**
 * Save assets by type (js, css)
 */
SortAssetsPlugin.prototype.apply = function(compiler) {

  compiler.plugin('done', (stats) => {
      const assets = sortAssets(stats.toJson({ modules: false }));
      let assetsByType = {};

      Object.keys(extensions).forEach(key => {
        assetsByType[key] = getAssetsByType(assets, extensions[key], this.options.prependPath);
      });

      this.callback(assetsByType);
  });
};

module.exports = SortAssetsPlugin;
