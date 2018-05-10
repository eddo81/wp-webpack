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
		"js" => ["/app/assets/js/app.js"],
		"css" => []
	];

    /** @var array */
    static $theme_colors = [
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
		"divider-color" => "rgba(0, 0, 0, 0.12)"
	];

    /** @var array */
    static $environment = [
		"wp_debug" => true,
		"wp_env" => "development"
	];

    /** @var string */
    static $text_domain = "presto";
  }