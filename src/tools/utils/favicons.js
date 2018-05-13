const fs = require('fs');
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
    //console.log(error.message); // Error description e.g. "An unknown error has occurred"
    return;
  }
};

favicons(
  _CONFIG.resolve(_CONFIG.directories.entry.images + 'logo.png'),
  options,
  (error, response) => {
    if (error) {
      //console.log(error.message); // Error description e.g. "An unknown error has occurred"
      return;
    }

    response.images.forEach(image => {
      fs.writeFile(
        _CONFIG.directories.output.images + image.name,
        image.contents,
        function(err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    });
  }
);
