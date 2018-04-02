<?php

/**
 * Helper function for prettying up errors
 * @param string $message
 * @param string $subtitle
 * @param string $title
 */
function paragon_error($message, $title = '') {
    $style = 'code { background-color: #f0f2f1; color: #DA564A; padding: 1px 5px; }';
    $message = "<style>{$style}</style><h1>{$title}</h1><p>{$message}</p>";
    wp_die($message, $title);
};

if (!file_exists($composer = __DIR__ . '/classes/vendor/autoload.php')) {
  paragon_error(
    __("<code>{$composer}</code><br><br>Please run the <code>composer install</code> command from the theme root directory.", 'paragon'),
    __('Autoloader not found.', 'paragon')
  );
}
require_once $composer;

if (!file_exists($paragon = __DIR__ . '/classes/Paragon.php')) {
  paragon_error(
    __("<code>{$paragon}</code><br><br>Please run the <code>npm start</code> or <code>npm run build</code> command from the \"src\" directory to generate it.", 'paragon'),
    __('File not found.', 'paragon')
  );
}

/**
 * Theme assets
 */
add_action('wp_enqueue_scripts', function () {
  try {
    foreach(App\Paragon::get_assets('css') as $asset_path) {
      wp_enqueue_style('',  get_bloginfo('template_url') . $asset_path, false, null);
    }
    foreach(App\Paragon::get_assets('js') as $asset_path) {
      wp_enqueue_script('',  get_bloginfo('template_url') . $asset_path, ['jquery'], null, true);
    }
  }catch (Exception $e) {
    $stack_trace = explode("\n", $e->getTraceAsString());
    paragon_error(
      __("{$e->getMessage()}<br><br><code>{$stack_trace[0]}</code>", 'paragon'),
      __('Caught exception.', 'paragon')
    );
  }
}, 100);
