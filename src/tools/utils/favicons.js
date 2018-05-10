const favicons = require('favicons');
const _CONFIG = require('../config');

const options = {
  path: '/',
  appName: null,
  appDescription: null,
  developerName: null,
  developerURL: null,
  dir: 'auto',
  lang: 'en-US',
  background: '#fff',
  theme_color: '#fff',
  display: 'standalone',
  orientation: 'any',
  start_url: '/?homescreen=1',
  version: '1.0',
  logging: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: true,
    favicons: true,
    firefox: true,
    windows: true,
    yandex: true
  }
};

const callback = function(error, response) {
  if (error) {
    console.log(error.message); // Error description e.g. "An unknown error has occurred"
    return;
  }
  console.log(response.images); // Array of { name: string, contents: <buffer> }
  console.log(response.files); // Array of { name: string, contents: <string> }
  console.log(response.html); // Array of strings (html elements)
};

favicons(
  _CONFIG.resolve(_CONFIG.directories.entry.images + 'logo.png'),
  options,
  callback
);
