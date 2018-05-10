module.exports = ({
  class_name,
  package_name,
  author,
  text_domain,
  env,
  assets,
  scss_variables
}) => {
  const arguments_list = Object.keys(assets).map(key => ` '${String(key)}'`);
  const template = `<?php

  /*
  |--------------------------------------------------------------------------
  | THIS FILE HAS BEEN AUTOMATICALLY GENERATED, DO NOT EDIT!
  |--------------------------------------------------------------------------
  */

  namespace Presto;

  /**
   * Class ${class_name}
   * @package ${package_name}
   * @author ${JSON.stringify(author)}
   */

  abstract class ${class_name}
  {
    /** @var array */
    static $assets = [${Object.keys(assets).map(
      key =>
        `\n\t\t${JSON.stringify(String(key))} => ${JSON.stringify(
          assets[key]
        ) || []}`
    )}\n\t];

    /** @var array */
    static $theme_colors = [${Object.keys(scss_variables)
      .filter(key => {
        return key.match(/^(.*?(\bcolor\b)[^$]*)$/);
      })
      .map(
        key =>
          `\n\t\t${JSON.stringify(String(key))} => ${JSON.stringify(
            scss_variables[key].replace(/\"/g, "'")
          )}`
      )}\n\t];

    /** @var array */
    static $environment = [\n\t\t"wp_debug" => ${env.debug},\n\t\t"wp_env" => ${
    env.mode
  }\n\t];

    /** @var string */
    static $text_domain = ${JSON.stringify(text_domain)};
  }`;

  return template;
};
