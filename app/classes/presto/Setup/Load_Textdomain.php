<?php

namespace Presto\Setup;

/**
 * Class Load_Textdomain
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class Load_Textdomain
{

  public function __construct(string $text_domain = '', string $path = '')
  {
    load_theme_textdomain($text_domain, $path);
  }
}
