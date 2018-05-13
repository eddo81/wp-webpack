<?php

  /*
  |--------------------------------------------------------------------------
  | THIS FILE HAS BEEN AUTOMATICALLY GENERATED, DO NOT EDIT!
  |--------------------------------------------------------------------------
  */

  namespace Presto;

  /**
   * Class Config
   * @package presto
   * @author "eddo81 <eduardo_jonnerstig@live.com>"
   */

  abstract class Config
  {
    /** @var array */
    static $assets = [
			"script" => [
				"/app/assets/js/manifest.01c8350fc8d48b48ca4d.js",
				"/app/assets/js/vendor.fbca3399c8ac4ed436b1.js",
				"/app/assets/js/app.0e5434de75a35b5b91b8.js"
			],
			"style" => [
				"/app/assets/css/app.59c86ecce7aa16aec5a1630a2302ac66.css"
			]
		];

    /** @var array */
    static $scss_variables = [
			"font-size--base" => "1.6rem",
			"font-size--headings" => "3.6rem, 3.2rem, 2.8rem, 2rem, 1.8rem, 1.6rem",
			"font-size--sm" => "1.2rem",
			"font-size--md" => "1.4rem",
			"font-size--lg" => "2rem",
			"baseline" => "2.4rem",
			"border-radius--sm" => "0.2rem",
			"border-radius--lg" => "100%",
			"border-width" => "0.1rem",
			"theme-color" => "#F02872",
			"theme-color--light" => "#ef2e75",
			"theme-color--dark" => "#f40a61",
			"accent-color" => "#E91E63",
			"accent-color--light" => "#e95185",
			"accent-color--dark" => "#de0f56",
			"link-color" => "#4076D4",
			"link-color--hover" => "#003695",
			"link-color--active" => "#7798d0",
			"black-color" => "#000",
			"white-color" => "#FFF",
			"grey-color" => "#F5F5F5",
			"grey-color--light" => "#FAFAFA",
			"grey-color--dark" => "#E0E0E0",
			"primary-text-color" => "rgba(0, 0, 0, 0.87)",
			"secondary-text-color" => "rgba(0, 0, 0, 0.54)",
			"hint-text-color" => "rgba(0, 0, 0, 0.38)",
			"divider-color" => "rgba(0, 0, 0, 0.12)",
			"primary-font" => "'Montserrat'",
			"icon-font" => "'FontAwesome'",
			"font-family--heading" => "'Montserrat', 'Helvetica Neue', 'Segoe UI', 'Verdana', sans-serif",
			"font-family--base" => "'Montserrat', 'Helvetica Neue', 'Segoe UI', 'Verdana', sans-serif",
			"font-family--monospace" => "'Consolas', 'Monaco', 'Courier New', monospace",
			"font-family-system" => "'system-ui', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
			"font-family--icon" => "'FontAwesome'",
			"font-weight--light" => "300",
			"font-weight--normal" => "400",
			"font-weight--semibold" => "500",
			"font-weight--bold" => "700",
			"screen--xs" => "0px",
			"screen--sm" => "576px",
			"screen--md" => "768px",
			"screen--lg" => "992px",
			"screen--xl" => "1200px",
			"duration--short" => "300ms",
			"duration--medium" => "600ms",
			"duration--long" => "900ms",
			"grid-columns" => "12",
			"grid-gutter-width" => "2.4rem",
			"container--sm" => "540px",
			"container--md" => "720px",
			"container--lg" => "960px",
			"container--xl" => "1140px",
			"use-desktop-mixin" => "true"
		];

    /** @var array */
    static $environment = [
			"wp_debug" => false,
			"wp_env" => "production"
		];

    /** @var string */
    static $text_domain = "presto";
  }