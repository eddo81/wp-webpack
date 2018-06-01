module.exports = ({
  text_domain,
  env,
  assets,
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
   * Class Config
   * @package presto
   * @author "eddo81 <eduardo_jonnerstig@live.com>"
   */

  abstract class Config
  {
    /** @var array */
    static $assets = [${Object.keys(assets).map(
      key =>
        `\n\t\t${JSON.stringify(String(key))} => ${JSON.stringify(
          assets[key]
        ) || []}`
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
