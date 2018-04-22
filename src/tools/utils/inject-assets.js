const fs        = require('fs');
const _PATH     = require('path');
const _CONFIG   = require('../config');

function injectAssets(assetsByType) {
  const className = _CONFIG.filenames.output.php.replace(/\.php/, '');
  const argumentsList = Object.keys(assetsByType).map(key => ` '${String(key)}'`);
  const template = `<?php

/*
|--------------------------------------------------------------------------
| THIS FILE HAS BEEN AUTOMATICALLY GENERATED, DO NOT EDIT!
|--------------------------------------------------------------------------
*/

namespace App;

/**
 * Class ${className}
 * @package Paragon
 * @author ${JSON.stringify(_CONFIG.package.author)}
 */

class ${className}
{
  /** @var array */
  static $assets = [${Object.keys(assetsByType).map(key => `\n\t\t${JSON.stringify(String(key))} => ${JSON.stringify(assetsByType[key]) || []}`)}\n\t];

  /** @var array */
  static $environment = [\n\t\t"wp_debug" => ${_CONFIG.env.debug},\n\t\t"wp_env" => ${_CONFIG.env.mode}\n\t];

  /** @var string */
  static $text_domain = ${JSON.stringify(_CONFIG.theme.text_domain)};

  /**
   * Returns an associative array containing the current development mode.
   * @return array
   */
  public static function get_environment()
  {
    return self::environment;
  }

  /**
   * Returns an array of strings containing the relative URLs for all dynamically named static assets that has been generated by Webpack.
   *
   * Accepts the following parameters: ${argumentsList}
   * @param string $asset_type
   * @return array
   */
  public static function get_assets(string $asset_type)
  {
    if(!isset(self::$assets[$asset_type])) {
      throw new \\Exception("Invalid argument <strong>'{$asset_type}'</strong> provided to method of class: <strong>'" . get_called_class() . "'</strong>. The following arguments are permittable: <strong>${argumentsList}</strong>.");
    }

    return self::$assets[$asset_type];
  }
}`;

  fs.writeFile(_CONFIG.directories.output.classes + _CONFIG.filenames.output.php, template, (error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = injectAssets;
