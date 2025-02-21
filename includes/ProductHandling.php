 
function update_woocommerce_product_dynamically( $product_id, $new_data ) {
    if ( ! function_exists( 'wc_get_product' ) ) {
        return;
    }

    $product = wc_get_product( $product_id );
    if ( ! $product ) {
        return;
    }

    // Example: Updating product title
    if ( isset( $new_data['title'] ) ) {
        $product->set_name( $new_data['title'] );
    }

    // Example: Updating product price
    if ( isset( $new_data['regular_price'] ) ) {
        $product->set_regular_price( $new_data['regular_price'] );
    }

    // Example: Updating product stock
    if ( isset( $new_data['stock'] ) ) {
        $product->set_stock_quantity( $new_data['stock'] );
    }

    // Example: Updating description
    if ( isset( $new_data['description'] ) ) {
        $product->set_description( $new_data['description'] );
    }

    // Example: Updating product SKU
    if ( isset( $new_data['sku'] ) ) {
        $product->set_sku( $new_data['sku'] );
    }

    // Save the changes
    $product->save();
}

// Example usage (Call this function dynamically as needed)
add_action( 'init', function () {
    $new_data = array(
        'title'         => 'Updated Product Name',
        'regular_price' => '49.99',
        'stock'         => 20,
        'description'   => 'This is a dynamically updated description.',
        'sku'           => 'NEW-SKU-2025'
    );

    update_woocommerce_product_dynamically( 78, $new_data ); // Replace 123 with your product ID
});
add_action( 'woocommerce_before_single_product', function () {
    echo '<p style="color: red;">ProductHandling.php hook executed!</p>';
} );
