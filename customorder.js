 

const capturedPlates = [];

// Capture both front and back plates as images
document.getElementById("capture-btn").addEventListener("click", function () {
  const frontPlate = document.getElementById("customPlateFront");
  const backPlate = document.getElementById("customPlateBack");

  // Capture front plate
  html2canvas(frontPlate, {
    backgroundColor: null,
    scale: 2,
    useCORS: true
  }).then((frontCanvas) => {
    const frontImgData = frontCanvas.toDataURL("image/png");

    // Capture back plate after front plate
    html2canvas(backPlate, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    }).then((backCanvas) => {
      const backImgData = backCanvas.toDataURL("image/png");

      capturedPlates.push({
        front: frontImgData,
        back: backImgData
      });

      console.log("Captured Plates: ", capturedPlates);
      createWooCommerceOrder(); // Create order after capture
    });
  });
});

// Function to create WooCommerce order
async function createWooCommerceOrder() {
  const nonce = woocommerceData.nonce;
  const latestPlate = capturedPlates[capturedPlates.length - 1];

  const orderData = {
    product_id: 78, // Replace with your WooCommerce product ID
    quantity: 1,
    custom_message: 'Please handle with care.',
    delivery_instructions: 'Leave at the front door.',
    custom_badge: 'Gold Member',
    captured_plates: latestPlate, // Send captured plates
  };

  try {
    const response = await fetch(`${woocommerceData.rest_url}custom/v1/create_order/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
      return;
    }

    const result = await response.json();
    console.log('Order created successfully and plates saved in order meta:', result);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
