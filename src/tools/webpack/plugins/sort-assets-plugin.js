const sortChunks = require('webpack-sort-chunks').default;

function sortAssets(stats) {
  const chunks = sortChunks(stats.chunks).map(chunk => chunk.files).reduce((a, b) => a.concat(b), []);
  const assets =  Object.keys(stats.assetsByChunkName)
    .reduce((initialValue, currentValue) => { return initialValue.concat(stats.assetsByChunkName[currentValue]) }, [])
    .sort((a, b) => chunks.indexOf(a) > chunks.indexOf(b) ? 1 : -1);
    return assets;
};

function getAssetsByType(assets, type, prependPath) {
  return assetsByType = [].concat(assets).filter((asset) => new RegExp(`${type}$`).test(asset)).map((asset) => prependPath + asset);
}

// Setup the plugin instance with options...
function SortAssetsPlugin(callback, prependPath = '') {
  this.callback = callback;
  this.prependPath = prependPath;
}

/**
 * Save assets by type (js, css)
 */
SortAssetsPlugin.prototype.apply = function(compiler) {

  compiler.plugin('done', (stats) => {
      const assets = sortAssets(stats.toJson({ modules: false }));
      const assetsByType = {
        js: getAssetsByType(assets, 'js', this.prependPath),
        css: getAssetsByType(assets, 'css', this.prependPath)
      };
      this.callback(assetsByType);
  });
};

module.exports = SortAssetsPlugin;
