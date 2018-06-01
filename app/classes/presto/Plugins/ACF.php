<?php

namespace Presto\Plugins;

/**
 * Class ACF
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class ACF
{
  /** @var string */
  private $acf_json_directory = '';

  /** @var string */
  private $text_domain = '';

  /**
   * register default hooks and actions for WordPress
   * @return
   */
  public function __construct(string $text_domain = '', string $acf_json_directory = '')
  {
    $this->text_domain = $text_domain;

    if(!file_exists($this->acf_json_directory = $acf_json_directory)) {
      wp_die("File not found: {$acf_json_directory}");
    }

    if(class_exists('acf')) {
      add_filter('acf/settings/save_json', [$this, 'acf_json_save_point']);
      add_filter('acf/settings/load_json', [$this, 'acf_json_load_point']);
    }   
  }

  public function acf_json_save_point(string $path) : string
  {
    return $path = $this->acf_json_directory;
  }

  public function acf_json_load_point(array $paths) : array
  {
    unset($paths[0]);
    return $paths[] = $this->acf_json_directory;
  }
}
