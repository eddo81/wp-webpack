<?php

namespace Presto\Setup;

/**
 * Class Deregister_Scripts
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class Deregister_Scripts
{
  /** @var array */
  protected $scripts = [];

  /**
   *
   * @return
   */
  public function __construct(array $scripts = [])
  {
    $this->scripts = array_merge($this->scripts, $scripts);
    add_action('wp_enqueue_scripts', [$this, 'deregister_scripts'], 100);
  }

  /**
   * Deregister WordPress scripts
   */
  public function deregister_scripts()
  {
    if (!empty($this->scripts)) {
      foreach ($this->scripts as $script) {
        wp_deregister_script($script);
      }
    }
  }
}
