<?php

namespace Presto;

use Presto\Setup\Clean_Markup;
use Presto\Setup\Disable_Pingback;
use Presto\Setup\Disable_Redirects;
use Presto\Setup\Deregister_Scripts;
use Presto\Setup\Enqueue_Scripts;
use Presto\Setup\Move_Scripts;
use Presto\Setup\Nice_Search;
use Presto\Setup\Load_Textdomain;
use Presto\Plugins\ACF;

/**
 * Class Init
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class Init extends Config
{
  /** @var boolean */
  private static $loaded = false;

  public function __construct()
  {
    if (self::$loaded) {
      return;
    }

    add_action('after_setup_theme', [$this, 'theme_setup']);

    self::$loaded = true;
  }

  /**
   * Initial theme setup
   */
  public function theme_setup()
  {
    new Clean_Markup();
    new Disable_Pingback();
    new Disable_Redirects();
    new Deregister_Scripts();
    new Enqueue_Scripts();
    new Move_Scripts();
    new Nice_Search();
    new Load_Textdomain(self::$text_domain, get_template_directory() . '/languages');
    new ACF();
  }

  /**
   * Returns an associative array containing the current development mode.
   * @return array
   */
  public static function get_environment()
  {
    return self::environment;
  }


  public static function preload()
  {
    foreach (self::$assets as $asset_category => $asset_collection) {

      foreach ($asset_collection as $asset) {
        $href = get_bloginfo('template_url') . $asset;
        echo "<link rel='preload' href='{$href}' as='{$asset_category}'>";
      }
    }
  }
}
