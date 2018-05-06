<?php

namespace Presto\Setup;

/**
 * Class Clean_Markup
 * @package presto
 * @author "eddo81 <eduardo_jonnerstig@live.com>"
 */

class Clean_Markup
{

  public function __construct()
  {
    add_action('init', [$this, 'format_wp_head']);
    add_filter('language_attributes', [$this, 'language_attributes']);
    add_filter('style_loader_tag', [$this, 'clean_style_tag']);
    add_filter('script_loader_tag', [$this, 'clean_script_tag']);
    add_filter('script_loader_src', [$this, 'remove_script_version'], 15, 1);
    add_filter('style_loader_src', [$this, 'remove_script_version'], 15, 1);
    add_filter('body_class', [$this, 'body_class']);
    add_filter('get_avatar', [$this, 'remove_self_closing_tags']);
    add_filter('comment_id_fields', [$this, 'remove_self_closing_tags']);
    add_filter('post_thumbnail_html', [$this, 'remove_self_closing_tags']);
    add_filter('get_bloginfo_rss', [$this, 'remove_default_description']);
    add_filter('the_generator', '__return_false');
  }

  public function format_wp_head()
  {

    /**
     * Clean up wp_head()
     *
     * Remove unnecessary <link>'s
     * Remove inline CSS and JS from WP emoji support
     * Remove inline CSS used by Recent Comments widget
     * Remove inline CSS used by posts with galleries
     * Remove self-closing tag
     *
     */

    remove_action('wp_head', 'feed_links_extra', 3);
    add_action('wp_head', 'ob_start', 1, 0);
    add_action('wp_head', function () {
      $pattern = '/.*' . preg_quote(esc_url(get_feed_link('comments_' . get_default_feed())), '/') . '.*[\r\n]+/';
      echo preg_replace($pattern, '', ob_get_clean());
    }, 3, 0);
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wp_shortlink_wp_head', 10);
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
    remove_action('wp_head', 'rest_output_link_wp_head', 10);
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    add_filter('use_default_gallery_style', '__return_false');
    add_filter('emoji_svg_url', '__return_false');
    add_filter('show_recent_comments_widget_style', '__return_false');
  }

  public function language_attributes()
  {
    /**
     * Clean up language_attributes() used in <html> tag
     *
     * Remove dir="ltr"
     */

    $attributes = [];

    if (is_rtl()) {
      $attributes[] = 'dir="rtl"';
    }

    $lang = get_bloginfo('language');

    if ($lang) {
      $attributes[] = "lang=\"$lang\"";
    }

    $output = implode(' ', $attributes);
    $output = apply_filters('soil/language_attributes', $output);

    return $output;
  }

  public function clean_style_tag($input)
  {
    /**
     * Clean up output of stylesheet <link> tags
     */
    preg_match_all("!<link rel='stylesheet'\s?(id='[^']+')?\s+href='(.*)' type='text/css' media='(.*)' />!", $input, $matches);
    if (empty($matches[2])) {
      return $input;
    }
    // Only display media if it is meaningful
    $media = $matches[3][0] !== '' && $matches[3][0] !== 'all' ? ' media="' . $matches[3][0] . '"' : '';
    return '<link rel="stylesheet" href="' . $matches[2][0] . '"' . $media . '>' . "\n";
  }

  public function clean_script_tag($input)
  {
    /**
     * Clean up output of <script> tags
     */
    $input = str_replace("type='text/javascript' ", '', $input);
    return str_replace("'", '"', $input);
  }

  public function body_class($classes)
  {

    /**
     * Add and remove body_class() classes
     */

  // Add post/page slug if not present
    if (is_single() || is_page() && !is_front_page()) {
      if (!in_array(basename(get_permalink()), $classes)) {
        $classes[] = basename(get_permalink());
      }
    }

  // Remove unnecessary classes
    $home_id_class = 'page-id-' . get_option('page_on_front');
    $remove_classes = [
      'page-template-default',
      $home_id_class
    ];
    $classes = array_diff($classes, $remove_classes);

    return $classes;
  }

  /**
   * Remove version query string from all styles and scripts
   *
   */
  public function remove_script_version($src)
  {
    return $src ? esc_url(remove_query_arg('ver', $src)) : false;
  }

  /**
   * Remove unnecessary self-closing tags
   */
  public function remove_self_closing_tags($input)
  {
    return str_replace(' />', '>', $input);
  }

  /**
   * Don't return the default description in the RSS feed if it hasn't been changed
   */
  public function remove_default_description($bloginfo)
  {
    $default_tagline = 'Just another WordPress site';
    return ($bloginfo === $default_tagline) ? '' : $bloginfo;
  }
}
