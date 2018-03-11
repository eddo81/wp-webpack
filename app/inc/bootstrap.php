<?php

define("_PUBLIC_", get_template_directory() . DIRECTORY_SEPARATOR . 'app/public' . DIRECTORY_SEPARATOR);

/**
 * Asset discovery
 *
 * @param $filename
 * @return string
 */
function get_asset_from_manifest()
{
    $manifestPath = _PUBLIC_ . 'manifest.json';
    $manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : null;

    if(!isset($manifest)) {
        return;
    }

    foreach($manifest as $key => $val) {

      if(preg_match('/^.+\.(js|css)$/', $key)) {
        $result[$key] = $val;
      }
    }

    return $result;
}
