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

 ////////////////////////////////////////////////////
//  function enqueue_custom_woocommerce_order_script() {
//     if (is_user_logged_in()) {
//         wp_enqueue_script(
//             'custom-woocommerce-order',
//             plugins_url('/customorder.js', __FILE__), // Correct path for plugin
//             array('jquery'), 
//             null, 
//             true
//         );
//         wp_localize_script('custom-woocommerce-order', 'woocommerceData', array(
//             'nonce' => wp_create_nonce('wp_rest'),
//             'rest_url' => esc_url_raw(rest_url())
//         ));
//     }
// }
// add_action('wp_enqueue_scripts', 'enqueue_custom_woocommerce_order_script');


function enqueue_custom_woocommerce_order_script() {
    if (is_user_logged_in()) {
        wp_enqueue_script(
            'custom-woocommerce-order',
            plugins_url('customorder.js', __FILE__), // Correct path for plugin file in root
            array('jquery'), 
            null, 
            true
        );
        wp_localize_script('custom-woocommerce-order', 'woocommerceData', array(
            'nonce' => wp_create_nonce('wp_rest'),
            'rest_url' => esc_url_raw(rest_url())
        ));
    }
}
add_action('wp_enqueue_scripts', 'enqueue_custom_woocommerce_order_script');

add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/create_order/', array(
        'methods' => 'POST',
        'callback' => 'create_custom_woocommerce_order',
        'permission_callback' => function () {
            return is_user_logged_in(); // Only allow logged-in users
        },
    ));
});

// function create_custom_woocommerce_order(WP_REST_Request $request) {
//     $current_user = wp_get_current_user();

//     if (!$current_user->ID) {
//         return new WP_Error('no_user', 'User not logged in', array('status' => 403));
//     }

//     if (!empty($data['custom_message'])) {
//         $order->update_meta_data('_custom_message', sanitize_text_field($data['custom_message']));
//         error_log('Custom Message Saved: ' . $data['custom_message']);
//     }
    
//     if (!empty($data['delivery_instructions'])) {
//         $order->update_meta_data('_delivery_instructions', sanitize_text_field($data['delivery_instructions']));
//         error_log('Delivery Instructions Saved: ' . $data['delivery_instructions']);
//     }
    
//     if (!empty($data['custom_badge'])) {
//         $order->update_meta_data('_custom_badge', sanitize_text_field($data['custom_badge']));
//         error_log('Custom Badge Saved: ' . $data['custom_badge']);
//     }
    

//     $data = $request->get_json_params();

//     $order = wc_create_order();

//     // Add product to the order
//     $order->add_product(wc_get_product($data['product_id']), $data['quantity']);

//     // Set billing details
//     $order->set_address(array(
//         'first_name' => $current_user->user_firstname,
//         'last_name'  => $current_user->user_lastname,
//         'email'      => $current_user->user_email,
//     ), 'billing');

//     // Set payment method
//     $order->set_payment_method('cod'); // Or other payment methods

//     $order->calculate_totals();
//     $order->update_status('processing', 'Order created via custom API.');
 
    

//     return array(
//         'success' => true,
//         'order_id' => $order->get_id(),
//     );
// }

function create_custom_woocommerce_order(WP_REST_Request $request) {
    $current_user = wp_get_current_user();

    if (!$current_user->ID) {
        return new WP_Error('no_user', 'User not logged in', array('status' => 403));
    }

    // 🔥 First, get the JSON request data
    $data = $request->get_json_params();

    $order = wc_create_order();

    // Add product to the order
    $order->add_product(wc_get_product($data['product_id']), $data['quantity']);

    // Set billing details
    $order->set_address(array(
        'first_name' => $current_user->user_firstname,
        'last_name'  => $current_user->user_lastname,
        'email'      => $current_user->user_email,
    ), 'billing');

    // 🔥 Save custom meta data AFTER initializing the order
    if (!empty($data['custom_message'])) {
        $order->update_meta_data('_custom_message', sanitize_text_field($data['custom_message']));
        error_log('Custom Message Saved: ' . $data['custom_message']);
    }

    if (!empty($data['delivery_instructions'])) {
        $order->update_meta_data('_delivery_instructions', sanitize_text_field($data['delivery_instructions']));
        error_log('Delivery Instructions Saved: ' . $data['delivery_instructions']);
    }

    if (!empty($data['custom_badge'])) {
        $order->update_meta_data('_custom_badge', sanitize_text_field($data['custom_badge']));
        error_log('Custom Badge Saved: ' . $data['custom_badge']);
    }

    // Save captured plates
    if (!empty($data['captured_plates'])) {
        $plates = $data['captured_plates'];
        if (isset($plates['front'])) {
            $order->update_meta_data('_front_plate_image', esc_url_raw($plates['front']));
        }
        if (isset($plates['back'])) {
            $order->update_meta_data('_back_plate_image', esc_url_raw($plates['back']));
        }
    }

    // Set payment method
    $order->set_payment_method('cod'); // Or other payment methods

    // Save order and meta
    $order->calculate_totals();
    $order->update_status('processing', 'Order created via custom API.');
    $order->save(); // 🔥 Ensure order and meta are saved

    return array(
        'success' => true,
        'order_id' => $order->get_id(),
    );
}


add_action('woocommerce_admin_order_data_after_order_details', 'display_custom_order_meta_in_admin');

function display_custom_order_meta_in_admin($order) {
    $custom_message = $order->get_meta('_custom_message');
    $delivery_instructions = $order->get_meta('_delivery_instructions');
    $custom_badge = $order->get_meta('_custom_badge');
    $front_plate = $order->get_meta('_front_plate_image');
    $back_plate = $order->get_meta('_back_plate_image');

    if ($custom_message || $delivery_instructions || $custom_badge||$front_plate || $back_plate) {
        echo '<h3>Custom Order Data</h3>';
        if ($custom_message) {
            echo '<p><strong>Custom Message:</strong> ' . esc_html($custom_message) . '</p>';
        }
        if ($delivery_instructions) {
            echo '<p><strong>Delivery Instructions:</strong> ' . esc_html($delivery_instructions) . '</p>';
        }
        if ($custom_badge) {
            echo '<p><strong>Badge:</strong> ' . esc_html($custom_badge) . '</p>';
        }
        echo '<h3>Captured Plates</h3>';
        if ($front_plate) {
            echo '<p><strong>Front Plate:</strong><br><img src="' . esc_url($front_plate) . '" style="max-width: 100%; height: auto;"/></p>';
        }
        if ($back_plate) {
            echo '<p><strong>Back Plate:</strong><br><img src="' . esc_url($back_plate) . '" style="max-width: 100%; height: auto;"/></p>';
        }
    }

}   
