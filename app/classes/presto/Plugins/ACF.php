<?php

namespace Presto\Plugins;

/**
 * Class ACF
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class ACF
{
  /**
   * register default hooks and actions for WordPress
   * @return
   */
  public function __construct()
  {
    add_filter('acf/settings/save_json', [$this, 'acf_json_save_point']);
    add_filter('acf/settings/load_json', [$this, 'acf_json_load_point']);
  }

  public function acf_json_save_point($path)
  {
    return $path = get_stylesheet_directory() . '/acf-json';
  }

  public function acf_json_load_point($paths)
  {
    unset($paths[0]);
    return $paths[] = get_stylesheet_directory() . '/acf-json';
  }
}
