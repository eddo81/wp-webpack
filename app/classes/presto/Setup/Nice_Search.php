<?php

namespace Presto\Setup;

/**
 * Class Nice_Search
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class Nice_Search
{

  public function __construct()
  {
    add_action('template_redirect', [$this, 'redirect']);
    add_filter('wpseo_json_ld_search_url', [$this, 'rewrite']);
  }

  /**
   * Redirects search results from /?s=query to /search/query/, converts %20 to +
   *
   */
  public function redirect()
  {
    global $wp_rewrite;
    if (!isset($wp_rewrite) || !is_object($wp_rewrite) || !$wp_rewrite->get_search_permastruct()) {
      return;
    }

    $search_base = $wp_rewrite->search_base;
    if (is_search() && !is_admin() && strpos($_SERVER['REQUEST_URI'], "/{$search_base}/") === false && strpos($_SERVER['REQUEST_URI'], '&') === false) {
      wp_redirect(get_search_link());
      exit();
    }
  }

  public function rewrite($url)
  {
    return str_replace('/?s=', '/search/', $url);
  }
}
