const fs = require('fs');
const _CONFIG = require('../config');

const style = `/*
Theme Name:         ${_CONFIG.theme.name}
Theme URI:          ${_CONFIG.theme.uri}
Description:        ${_CONFIG.theme.description}
Version:            ${_CONFIG.theme.version}
Author:             ${_CONFIG.theme.author}
Author URI:         ${_CONFIG.theme.author_uri}
Text Domain:        ${_CONFIG.theme.text_domain}

License:            MIT License
License URI:        http://opensource.org/licenses/MIT
*/`;

fs.writeFile(_CONFIG.resolve(`${_CONFIG.directories.output.app}style.css`), style, (error) => {
  if (error) {
    throw error;
  }
});

