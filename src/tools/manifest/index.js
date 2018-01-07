const _CONFIG = require('../config');

const _SEED = {
  name: _CONFIG.appname,
  short_name: _CONFIG.appname,
  description:  _CONFIG.package.description,
  icons: [
    {
      src: `${_CONFIG.directories.output.icons}android-chrome-192x192.png`,
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: `${_CONFIG.directories.output.icons}android-chrome-512x512.png`,
      sizes: '512x512',
      type: 'image/png'
    }
  ],
  start_url: _CONFIG.filenames.output.html,
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#000000',
  theme_color: '#FFFFFF'
};

module.exports = _SEED;