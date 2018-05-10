<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
    <meta name="description" content="">
    <link rel="manifest" href="<?= get_bloginfo('url') . '/wp-content/themes/presto/app/assets/manifest.json'; ?>">
    <?php wp_head(); ?>
  </head>
  <body>
    <noscript id="noscript">
      <p>This page requires JavaScript, please enable it in your browser to access the content.</p>
    </noscript>
    <!--[if lte IE 9]><p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p><![endif]-->
