<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
    <meta name="description" content="">
    <!-- <link rel="icon" type="image/png" sizes="32x32" href="<%= htmlWebpackPlugin.options.config.directories.output.icons + 'favicon-32x32.png' %>">
    <link rel="icon" type="image/png" sizes="16x16" href="<%= htmlWebpackPlugin.options.config.directories.output.icons + 'favicon-16x16.png' %>"> -->
    <!--[if IE]><link rel="shortcut icon" href="<%= htmlWebpackPlugin.options.config.directories.output.icons + 'favicon.ico' %>"><![endif]-->
    <!-- Add to home screen for Android and modern mobile browsers -->
    <!-- <link rel="manifest" href="<?= get_bloginfo('url'); ?><%= htmlWebpackPlugin.options.config.server.public_path + 'manifest.json' %>"> -->
    <meta name="theme-color" content="#000000">

    <!-- Add to home screen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!-- <meta name="apple-mobile-web-app-title" content="<%= htmlWebpackPlugin.options.config.appname %>"> -->
    <!-- <link rel="apple-touch-icon" href="<%= htmlWebpackPlugin.options.config.directories.output.icons + 'apple-touch-icon-152x152.png' %>"> -->
    <!-- Add to home screen for Windows -->
    <!-- <meta name="msapplication-TileImage" content="<%= htmlWebpackPlugin.options.config.directories.output.icons + 'msapplication-icon-144x144.png' %>"> -->
    <meta name="msapplication-TileColor" content="#000000">
    <?php wp_head(); ?>
    <?php if(!empty($assets['css'])): ?>
      <?php foreach($assets['css'] as $href): ?>
        <link rel="stylesheet" href="<?= get_bloginfo('template_url') . $href; ?>">
      <?php endforeach; ?>
    <?php endif; ?>
  </head>
  <body>
    <noscript id="noscript"><aside><p><span>This page requires JavaScript, please enable it in your browser to access the content.</span></p><footer></footer></aside></noscript>
    <!--[if lte IE 9]><p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p><![endif]-->

