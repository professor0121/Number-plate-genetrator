<?php
/**
 * Plugin Name: Custom Badge Selector
 * Description: A shortcode-based badge selector using custom HTML and JS files.
 * Version: 1.0
 * Author: Your Name
 */

// Register the shortcode [number_plate_generator]

if (!defined('WP_DEBUG')) define('WP_DEBUG', true);
if (!defined('WP_DEBUG_LOG')) define('WP_DEBUG_LOG', true);
if (!defined('WP_DEBUG_DISPLAY')) define('WP_DEBUG_DISPLAY', false);
add_shortcode('number_plate_generator', 'render_custom_badge_selector');

function render_custom_badge_selector() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'index.html';
    return ob_get_clean();
}

// Enqueue custom JS and CSS
add_action('wp_enqueue_scripts', 'enqueue_custom_badge_assets');

function enqueue_custom_badge_assets() {
    // Enqueue your custom JavaScript
    wp_enqueue_script('custom-tabs', plugins_url('/tabs.js', __FILE__), array('jquery'), '1.0', true);
    wp_enqueue_style('tailwind-css', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    wp_enqueue_script('custom-tabs-custom', plugins_url('/tab_custom.js', __FILE__), array('jquery'), '1.0', true);
    // wp_enqueue_script('custom-tabs-custom', plugins_url('/tab_custom.js', __FILE__), array('jquery'), filemtime(plugin_dir_path(__FILE__) . 'tabs_custom.js'), true);


}
function custom_badge_log($message) {
    if (WP_DEBUG === true) {
        error_log('Custom Badge Selector Log: ' . $message);
    }
}
add_action('wp_enqueue_scripts', 'enqueue_capture_div_scripts');

function enqueue_capture_div_scripts() {
    // Enqueue html2canvas from CDN
    wp_enqueue_script(
        'html2canvas',
        'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
        array(),
        null,
        true
    );

    // Enqueue your custom JavaScript
    wp_enqueue_script(
        'capture-div-script',
        plugins_url('/js/capture-div.js', __FILE__), // Make sure the path is correct
        array('jquery', 'html2canvas'), // Dependencies
        '1.0',
        true
    );

    // Pass site URL to JS if needed
    wp_localize_script('capture-div-script', 'pluginData', array(
        'pluginUrl' => plugins_url('/', __FILE__)
    ));
}
