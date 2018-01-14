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

// Load scripts
function load_theme_scripts() {
  $uri = get_template_directory_uri() . '/public/';
  wp_enqueue_script('manifest', $uri . 'js/manifest.js', null, null, true);
  wp_enqueue_script('vendor', $uri . 'js/vendor.js', null, null, true);
  wp_enqueue_script('app', $uri . 'js/app.js', null, null, true);
  wp_enqueue_style('style', $uri . 'css/app.css', false, null);
}
add_action('wp_enqueue_scripts', 'load_theme_scripts', 100);
