<?php

// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

// Creates the link tag
function manifest_link() {
  $uri = get_template_directory_uri() . '/public/manifest.json';
  echo '<link rel="manifest" href="'.$uri.'">';
}
add_action('wp_head', 'manifest_link');

require_once('app/inc/bootstrap.php');
require_once('app/inc/enqueue.php');
