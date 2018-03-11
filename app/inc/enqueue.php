<?php

// Load scripts
function load_theme_scripts() {

  $uri = get_template_directory_uri() . '/app/public/';
  $assets = get_asset_from_manifest();
  $script_keys = [
    'manifest.js',
    'vendor.js',
    'app.js'
  ];

  foreach($script_keys as $key) {
    if(array_key_exists($key, $assets)) {
      wp_enqueue_script($key, $uri . $assets[$key], null, null, true);
    }
  }

  if(array_key_exists('app.css', $assets)) {
    wp_enqueue_style('style', $uri . $assets['app.css'], false, null);
  }

}
add_action('wp_enqueue_scripts', 'load_theme_scripts', 100);
