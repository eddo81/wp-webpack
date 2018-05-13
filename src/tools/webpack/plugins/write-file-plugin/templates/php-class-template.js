module.exports = ({ class_name, text_domain, env, assets, scss_variables }) => {
  const template = `<?php

  /*
  |--------------------------------------------------------------------------
  | THIS FILE HAS BEEN AUTOMATICALLY GENERATED, DO NOT EDIT!
  |--------------------------------------------------------------------------
  */

  namespace Presto;

  /**
   * Class ${class_name}
   * @package presto
   * @author "eddo81 <eduardo_jonnerstig@live.com>"
   */

  abstract class ${class_name}
  {
    /** @var array */
    static $assets = [${Object.keys(assets).map(
      key =>
        `\n\t\t\t${JSON.stringify(String(key))} => [${assets[key].map(
          (asset, index) => {
            const padding = index === assets[key].length - 1 ? `\n\t\t\t` : '';
            return `\n\t\t\t\t${JSON.stringify(asset)}${padding}`;
          }
        )}]`
    )}\n\t\t];

    /** @var array */
    static $scss_variables = [${Object.keys(scss_variables).map(
      key =>
        `\n\t\t\t${JSON.stringify(String(key))} => ${JSON.stringify(
          scss_variables[key].replace(/\"/g, "'")
        )}`
    )}\n\t\t];

    /** @var array */
    static $environment = [\n\t\t\t"wp_debug" => ${
      env.debug
    },\n\t\t\t"wp_env" => ${env.mode}\n\t\t];

    /** @var string */
    static $text_domain = ${JSON.stringify(text_domain)};
  }`;

  return template;
};
