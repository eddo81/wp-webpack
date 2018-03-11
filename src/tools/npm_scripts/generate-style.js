const fs = require('fs');
const _CONFIG = require('../config');

const style = `/*
Theme Name: WP-Webpack
Theme URI:
Author:
Author URI:
Description:
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: wpwebpack
Tags: Wordpress, Webpack
This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned with others.
*/`;

fs.writeFile(_CONFIG.resolve('style.css'), style, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

