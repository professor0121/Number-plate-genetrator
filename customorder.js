const capturedPlates = [];

// Capture and store both plates as images
document.getElementById("capture-btn").addEventListener("click", function () {
  // Select both front and back plates
  const frontPlate = document.getElementById("customPlateFront");
  const backPlate = document.getElementById("customPlateBack");

  // Capture the front plate
  html2canvas(frontPlate, {
    backgroundColor: null, // Transparent background
    scale: 2, // High resolution
    useCORS: true // Allow cross-origin images
  }).then((frontCanvas) => {
    const frontImgData = frontCanvas.toDataURL("image/png");

    // Capture the back plate after capturing the front plate
    html2canvas(backPlate, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    }).then((backCanvas) => {
      const backImgData = backCanvas.toDataURL("image/png");

      // Store both images in the array as an object
      capturedPlates.push({
        front: frontImgData,
        back: backImgData
      });
        console.log(capturedPlates);
    });
  });
});


async function createWooCommerceOrder() {
  console.log('Creating WooCommerce order...');

  const nonce = woocommerceData.nonce;
  // const orderData = {
  //     product_id: 78,
  //     quantity: 1,
  // };
  // if (capturedPlates.length === 0) {
  //   alert("No plates captured yet!");
  //   return;
  // }

  const latestPlate = capturedPlates[capturedPlates.length - 1];


  const orderData = {
    product_id: 78,
    quantity: 1,
    custom_message: 'Please handle with care.',
    delivery_instructions: 'Leave at the front door.',
    custom_badge: 'Gold Member',
    captured_plates: latestPlate,
  };
  

  try {
      console.log('Sending request to:', `${woocommerceData.rest_url}custom/v1/create_order/`);

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
      console.log('Order created successfully:', result);
  } catch (error) {
      console.error('Fetch error:', error);
  }
}
console.log('customorder.js loaded');

document.getElementById('capture-btn').addEventListener('click', () => {
  console.log('Button clicked');
  createWooCommerceOrder();
});
