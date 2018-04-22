<?php

/**
 * Helper function for prettying up errors
 * @param string $message
 * @param string $title
 */
function paragon_error(string $message, string $title = '') {
    $style = 'code { background-color: #f0f2f1; color: #DA564A; padding: 1px 5px; }';
    $message = "<style>{$style}</style><h1>{$title}</h1><p>{$message}</p>";
    wp_die($message, $title);
};

if (!file_exists($composer = __DIR__ . '/app/classes/vendor/autoload.php')) {
  paragon_error(
    __("<code>{$composer}</code><br><br>Please run the <code>composer install</code> command from the theme root directory.", 'paragon'),
    __('Autoloader not found.', 'paragon')
  );
}
require_once $composer;

if (!file_exists($assets_loader = __DIR__ . '/app/classes/AssetsLoader.php')) {
  paragon_error(
    __("<code>{$assets_loader}</code><br><br>Please run the <code>npm start</code> or <code>npm run build</code> command from the \"src\" directory to generate it.", 'paragon'),
    __('File not found.', 'paragon')
  );
}

require_once __DIR__ . '/app/includes/enqueue.php';

// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

function disable_wp_emojicons() {
  add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce');
  remove_action('admin_print_styles', 'print_emoji_styles');
  remove_action('wp_head', 'print_emoji_detection_script', 1);
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
  remove_filter('the_content_feed', 'wp_staticize_emoji');
  remove_filter('comment_text_rss', 'wp_staticize_emoji');
}

function disable_emojicons_tinymce( $plugins ) {
  if (is_array($plugins)) {
    return array_diff($plugins, array('wpemoji'));
  } else {
    return array();
  }
}

add_action('init', 'disable_wp_emojicons');
