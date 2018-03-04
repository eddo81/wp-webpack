const fs        = require('fs');
const _PATH     = require('path');
const _IMGSIZE  = require('image-size');
const _CONFIG   = require('../config');

let icons = [].concat(...[
  `./${_CONFIG.directories.entry.icons}`
].filter(directory => fs.existsSync(directory)).map(directory => fs.readdirSync(directory).filter(icon => { return _PATH.extname(icon).match(_CONFIG.extensions.images)}) )
).map(icon => { const dimentions = _IMGSIZE(_CONFIG.directories.entry.icons + icon); return  {src: _CONFIG.directories.output.icons + icon, sizes: `${dimentions.width}x${dimentions.height}`, type: `image/${_PATH.extname(icon).replace(/\W*/, '')}`}; });

module.exports = (icons.length > 0) ? icons : undefined;
