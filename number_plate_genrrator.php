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
 function create_woocommerce_order_once( $product_id, $quantity = 1, $customer_id = 0 ) {
    if ( ! function_exists( 'wc_create_order' ) ) {
        return;
    }

    // Check if an order already exists in this session
    if ( get_transient( 'custom_order_created' ) ) {
        return false; // Prevent creating a new order
    }

    try {
        // Create the order
        $order = wc_create_order();

        // Add product to the order
        $order->add_product( wc_get_product( $product_id ), $quantity );

        // Set customer ID
        if ( $customer_id > 0 ) {
            $order->set_customer_id( $customer_id );
        }

        // Set billing and shipping address (Example data)
        $address = array(
            'first_name' => 'John',
            'last_name'  => 'Doe',
            'email'      => 'johndoe@example.com',
            'phone'      => '1234567890',
            'address_1'  => '123 Main Street',
            'city'       => 'Cityville',
            'state'      => 'CA',
            'postcode'   => '90001',
            'country'    => 'US',
        );
        $order->set_address( $address, 'billing' );
        $order->set_address( $address, 'shipping' );

        // Calculate totals and set order status
        $order->calculate_totals();
        $order->update_status( 'processing', 'Order created dynamically.' );
        $order->save();

        // Mark that an order has been created for this session
        set_transient( 'custom_order_created', true, 60 * 60 ); // Prevent another order for 1 hour

        error_log( 'Order created successfully. Order ID: ' . $order->get_id() );
        return $order->get_id();
    } catch ( Exception $e ) {
        error_log( 'Failed to create order: ' . $e->getMessage() );
        return false;
    }
}

// Example usage (Order will only be created once)
add_action( 'init', function () {
    $order_id = create_woocommerce_order_once(78, 1 ); // Replace 123 with your product ID
    if ( $order_id ) {
        echo 'Order Created Successfully. Order ID: ' . $order_id;
    } else {
        echo 'Order already exists or could not be created.';
    }
} );
function create_order_once_per_customer( $product_id, $quantity = 1, $customer_id = 0 ) {
    if ( ! function_exists( 'wc_create_order' ) ) {
        return;
    }

    // Check if the customer already has an order
    $existing_orders = wc_get_orders( array(
        'customer_id' => $customer_id,
        'status'      => array( 'processing', 'completed' ),
        'limit'       => 1
    ) );

    if ( ! empty( $existing_orders ) ) {
        return false; // Order already exists
    }

    try {
        $order = wc_create_order();
        $order->add_product( wc_get_product( $product_id ), $quantity );
        $order->set_customer_id( $customer_id );

        $order->calculate_totals();
        $order->update_status( 'processing', 'Order created dynamically.' );
        $order->save();

        error_log( 'Order created for customer. Order ID: ' . $order->get_id() );
        return $order->get_id();
    } catch ( Exception $e ) {
        error_log( 'Failed to create order: ' . $e->getMessage() );
        return false;
    }
}

// Example usage
add_action( 'init', function () {
    $customer_id = get_current_user_id();
    if ( $customer_id ) {
        $order_id = create_order_once_per_customer(78, 1, $customer_id ); // Replace 123 with your product ID
        if ( $order_id ) {
            echo 'Order Created Successfully for Customer. Order ID: ' . $order_id;
        } else {
            echo 'You already have an active order.';
        }
    }
} );
if ( ! session_id() ) {
    session_start();
}

function create_order_with_session( $product_id, $quantity = 1 ) {
    if ( isset( $_SESSION['order_created'] ) ) {
        return false;
    }

    $order = wc_create_order();
    $order->add_product( wc_get_product( $product_id ), $quantity );
    $order->calculate_totals();
    $order->update_status( 'processing' );
    $order->save();

    $_SESSION['order_created'] = true;

    return $order->get_id();
}
