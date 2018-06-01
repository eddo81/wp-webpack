'use strict';

const writeFile = require('../../../utils/write-file.js');

function WriteFilePlugin(options = {}) {
  this.options = options;
}

WriteFilePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', () => {
    writeFile(this.options.filePath, this.options.fileContents);
  });
};

module.exports = WriteFilePlugin;
