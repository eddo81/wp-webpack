'use strict';

const _WRITE = require('write');

function WriteFilePlugin(options = {}) {
    this.options = options;
}

WriteFilePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', () => {
    _WRITE.sync(this.options.filePath, this.options.fileContents, (error) => { if (error) { throw error; } });
  });
};

module.exports = WriteFilePlugin;
