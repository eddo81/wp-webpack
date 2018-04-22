<?php

/**
 * Enqueue theme scripts and styles
 */
add_action('wp_enqueue_scripts', function () {
  try {
    foreach(App\AssetsLoader::get_assets('css') as $asset_path) {
      wp_enqueue_style('',  get_bloginfo('template_url') . $asset_path, false, null);
    }
    foreach(App\AssetsLoader::get_assets('js') as $key => $asset_path) {
      wp_enqueue_script('script_' . $key,  get_bloginfo('template_url') . $asset_path, ['jquery'], null, true);
    }
  }catch (Exception $e) {
    $stack_trace = explode("\n", $e->getTraceAsString());
    paragon_error(
      __("{$e->getMessage()}<br><br><code>{$stack_trace[0]}</code>", 'paragon'),
      __('Caught exception.', 'paragon')
    );
  }
}, 100);
