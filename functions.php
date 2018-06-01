<?php

use Presto\Init;

/**
 * Helper function for prettying up errors
 * @param string $message
 * @param string $title
 */
function presto_error(string $message, string $title = '')
{
  $style = 'code { background-color: #f0f2f1; color: #DA564A; padding: 1px 5px; }';
  $message = "<style>{$style}</style><h1>{$title}</h1><p>{$message}</p>";
  wp_die($message, $title);
};

if (!file_exists($composer = __DIR__ . '/app/classes/vendor/autoload.php')) {
  presto_error(
    __("<code>{$composer}</code><br><br>Please run the <code>composer install</code> command from the theme root directory.", 'presto'),
    __('Autoloader not found.', 'presto')
  );
}
require_once $composer;

if (!file_exists($config = __DIR__ . '/app/classes/presto/Config.php')) {
  presto_error(
    __("<code>{$config}</code><br><br>Please run the <code>npm start</code> or <code>npm run build</code> command from the \"src\" directory to generate it.", 'presto'),
    __('File not found.', 'presto')
  );
}

if (!file_exists($setup = __DIR__ . '/app/classes/presto/Init.php')) {
  presto_error(
    __("<code>{$setup}</code><br><br>", 'presto'),
    __('File not found.', 'presto')
  );
}

$setup = new Init();
