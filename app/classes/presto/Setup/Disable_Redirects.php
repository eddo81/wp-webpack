<?php

namespace Presto\Setup;

/**
 * Class Disable_Redirects
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class Disable_Redirects
{

  public function __construct()
  {
    add_action('init', [$this, 'remove_redirects']);
    // Remove all default WP template redirects/lookups
    remove_action('template_redirect', 'redirect_canonical');
  }

  /**
   * Redirect all requests to index.php
   */
  public function remove_redirects()
  {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
  }
}
