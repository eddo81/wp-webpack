const fs        = require('fs');
const _PATH     = require('path');
const _ROOT     = `${_PATH.resolve(_PATH.join(__dirname, '../../../'))}/`;
const _PKG      = require(`${_ROOT}package.json`);
const _ENV      = new function() {
    this.debug  = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production') ? true : false;
    this.mode   = (this.debug === true) ? '"development"' : '"production"';
};

const _DIRECTORIES = {

  root: _ROOT,

  entry: new function() {

    // Root
    this.src                = 'src/';
    this.tools              = `${this.src}tools/`;
    this.framework          = `${this.src}vue/`;
    this.assets             = `${this.src}assets/`;

    // Tools
    this.server             = `${this.tools}server/`;

    // Assets
    this.static             = `${this.assets}static/`;
    this.images             = `${this.assets}images/`;
    this.media              = `${this.assets}media/`;
    this.fonts              = `${this.assets}fonts/`;
    this.scripts            = `${this.assets}scripts/`;
    this.scss               = `${this.assets}scss/`;
    this.icons              = `${this.static}img/icons/`;

    // SCSS Resources
    this.resources          = `${this.scss}resources/`;
    this.scss_variables     = `${this.resources}variables/`;
    this.scss_functions     = `${this.resources}functions/`;
    this.scss_mixins        = `${this.resources}mixins/`;
    this.scss_placeholders  = `${this.resources}placeholders/`;
  },

  output: new function() {
    this.app                = `app/`;
    this.assets             = `${this.app}assets/`;
    this.includes           = `${this.app}includes/`;
    this.views              = `${this.app}views/`;
    this.classes            = `${this.app}classes/`;
    this.js                 = `js/`;
    this.css                = `css/`;
    this.media              = `media/`;
    this.fonts              = `fonts/`;
    this.images             = `img/`;
    this.icons              = `${this.images}icons/`;
  }
};

const _FILENAMES = {

  entry: new function() {
    this.js                 = `main.js`;
    this.manifest           = `manifest.json`;
    this.scss               = `style.scss`;
    this.webpack_config     = `webpack.${(_ENV.debug) ? 'dev' : 'prod' }.conf.js`;
  },

  output: new function() {
    this.js                 = `bundle.js`;
    this.php                = `AssetsLoader.php`;
    this.css                = `style.css`;
  }
};

const _EXTENSIONS = {
  js:       /\.(js|es6)$/i,
  vue:      /\.vue$/i,
  scss:     /\.s[a|c]ss$/i,
  text:     /\.(xml|txt)(\?.*)?$/i,
  images:   /\.(png|jpe?g|gif|svg|tiff|bmp|ico)(\?.*)?$/i,
  media:    /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
  fonts:    /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  html:     /\.html$/i
};

const _THEME = new function() {
  this.name             = 'Paragon';
  this.description      = 'A modern WordPress starter theme.';
  this.uri              = '';
  this.version          = '1.0.0';
  this.author           = '';
  this.author_uri       = '';
  this.text_domain      = 'paragon';
  this.background_color = '#000000';
  this.theme_color      = '#FFFFFF';
};

const _SERVER = new function() {
  this.autoOpenBrowser = true;
  this.port            = 8080;
  this.dev_url         = `http://localhost/wordpress`;
  this.proxy_url       = `http://localhost:${this.port}`;
  this.public_path     = `/wp-content/themes/${_THEME.name}/${_DIRECTORIES.output.assets}`; // Path to theme root (/wp-content/themes/my-theme/)
};

const _CONFIG = {
  theme:        _THEME,
  env:          _ENV,
  directories:  _DIRECTORIES,
  filenames:    _FILENAMES,
  extensions:   _EXTENSIONS,
  package:      _PKG,
  server:       _SERVER,
  resources: [].concat(...[
      `./${_DIRECTORIES.entry.scss_variables}`,
      `./${_DIRECTORIES.entry.scss_functions}`,
      `./${_DIRECTORIES.entry.scss_mixins}`,
      `./${_DIRECTORIES.entry.scss_placeholders}`
    ].filter(resource => fs.existsSync(resource)).map(path => fs.readdirSync(path).map(filename => path + filename))
  ),
  resolve: function(dir = '') {
    return _PATH.join(_DIRECTORIES.root, dir);
  }
};

module.exports = _CONFIG;
