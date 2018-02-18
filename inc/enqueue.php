<?php

// Load scripts
function load_theme_scripts() {

  $uri = get_template_directory_uri() . '/public/';
  $assets = get_asset_from_manifest();

  if($assets['manifest.js']) {
    wp_enqueue_script('manifest', $uri . $assets['manifest.js'], null, null, true);
  }

  if($assets['vendor.js']) {
    wp_enqueue_script('vendor', $uri . $assets['vendor.js'], null, null, true);
  }

  if($assets['app.js']) {
    wp_enqueue_script('app', $uri . $assets['app.js'], null, null, true);
  }

  if($assets['app.css']) {
    wp_enqueue_style('style', $uri . $assets['app.css'], false, null);
  }

}
add_action('wp_enqueue_scripts', 'load_theme_scripts', 100);
