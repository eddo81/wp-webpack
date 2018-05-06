<?php

namespace Presto\Setup;

/**
 * Class Move_Scripts
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class Move_Scripts
{

  public function __construct()
  {
    add_action('wp_enqueue_scripts', [$this, 'js_to_footer']);
  }

  /**
   * Moves all scripts to wp_footer action
   *
   */
  public function js_to_footer()
  {
    remove_action('wp_head', 'wp_print_scripts');
    remove_action('wp_head', 'wp_print_head_scripts', 9);
    remove_action('wp_head', 'wp_enqueue_scripts', 1);
  }
}
