document.addEventListener('DOMContentLoaded', () => {
    // Font controls for Custom Plates
    const customFontSizeSelector = document.getElementById('customFontSizeSelector');
    const customFontStyleSelector = document.getElementById('customFontStyleSelector');
    const customFontColorPicker = document.getElementById('customFontColorPicker');
  
    // Custom Plate elements
    const customFrontPlate = document.getElementById('customPlateFront');
    const customBackPlate = document.getElementById('customPlateBack');
  
    // Function to update font styles for custom plates
    function updateCustomFontStyles() {
      const selectedFontSize = customFontSizeSelector.value;
      const selectedFontStyle = customFontStyleSelector.value;
      const selectedFontColor = customFontColorPicker.value;
  
      // Reset font styles
      resetCustomFontClasses(customFrontPlate);
      resetCustomFontClasses(customBackPlate);
  
      // Apply new font size and style
      customFrontPlate.classList.add(selectedFontSize);
      customBackPlate.classList.add(selectedFontSize);
  
      if (selectedFontStyle !== 'normal') {
        customFrontPlate.classList.add(selectedFontStyle);
        customBackPlate.classList.add(selectedFontStyle);
      }
  
      // Apply font color
      customFrontPlate.style.color = selectedFontColor;
      customBackPlate.style.color = selectedFontColor;
    }
  
    // Helper function to reset font-related classes
    function resetCustomFontClasses(element) {
      element.classList.forEach((className) => {
        if (
          className.startsWith('text-') ||
          className === 'font-bold' ||
          className === 'italic' ||
          className === 'underline'
        ) {
          element.classList.remove(className);
        }
      });
    }
  
    // Event listeners for font controls
    customFontSizeSelector.addEventListener('change', updateCustomFontStyles);
    customFontStyleSelector.addEventListener('change', updateCustomFontStyles);
    customFontColorPicker.addEventListener('input', updateCustomFontStyles);
  
    // Apply default font styles on page load
    updateCustomFontStyles();
  });
  

  //handling the custom plate style
  document.addEventListener('DOMContentLoaded', () => {
  const plateStyleSelector = document.getElementById('plateStyleSelector');

  // Plate elements
  const customFrontPlate = document.getElementById('customPlateFront');
  const customBackPlate = document.getElementById('customPlateBack');

  // Function to update the plate style dynamically
  function updatePlateStyle() {
    const selectedStyle = plateStyleSelector.value;

    // Reset styles while preserving other classes
    resetPlateStyles(customFrontPlate);
    resetPlateStyles(customBackPlate);

    // Apply the selected style
    applyStyleToPlate(customFrontPlate, selectedStyle);
    applyStyleToPlate(customBackPlate, selectedStyle);
  }

  // Function to apply a specific style to the plate
  function applyStyleToPlate(plate, style) {
    switch (style) {
      case '3d-style':
        plate.classList.add('shadow-xl'); // Apply shadow to the plate
        applyTextShadow(plate); // Automatically apply text shadow
        break;
      case 'carbon-fiber':
        plate.classList.add('bg-gray-800', 'border', 'border-gray-500');
        break;
      case 'glossy-finish':
        plate.classList.add('bg-gradient-to-r', 'from-gray-600', 'to-gray-900');
        break;
      case 'matte-black':
        plate.classList.add('bg-black', 'text-white');
        break;
      case 'chrome-style':
        plate.classList.add('bg-gradient-to-r', 'from-gray-400', 'to-gray-100');
        break;
      case 'holographic':
        plate.classList.add('bg-gradient-to-r', 'from-purple-500', 'to-pink-500');
        break;
      case 'gradient-neon':
        plate.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-green-500');
        break;
      default:
        plate.classList.add('bg-white', 'text-black'); // Default style
    }
  }

  // Function to apply a default text shadow for 3D style
  function applyTextShadow(plate) {
    plate.classList.add('shadow-lg', 'text-shadow-3d');
  }

  // Function to reset plate styles (removing size, color, shadow)
  function resetPlateStyles(plate) {
    plate.classList.remove(
      'bg-gray-800',
      'bg-black',
      'bg-gradient-to-r',
      'from-gray-600',
      'to-gray-900',
      'border',
      'border-gray-500',
      'shadow-xl',
      'bg-gradient-to-r',
      'from-purple-500',
      'to-pink-500',
      'shadow-lg',
      'text-shadow-3d'
    );
  }

  // Event listener for plate style change
  plateStyleSelector.addEventListener('change', updatePlateStyle);

  // Apply default style on page load
  updatePlateStyle();
});


////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const plateSizeSelector = document.getElementById('plateSizeSelectorcustom');
  
    // Plate elements
    const customFrontPlate = document.getElementById('customPlateFront');
    const customBackPlate = document.getElementById('customPlateBack');
  
    // ✅ Function: Update the size of the plates dynamically
    function updatePlateSize() {
      const selectedSize = plateSizeSelector.value;
  
      // Remove existing size classes
      removeSizeClasses(customFrontPlate);
      removeSizeClasses(customBackPlate);
  
      // Apply the new size classes
      if (selectedSize !== 'default') {
        customFrontPlate.classList.add(...selectedSize.split(' '));
        customBackPlate.classList.add(...selectedSize.split(' '));
      } else {
        // Apply default size if selected
        customFrontPlate.classList.add('w-100', 'h-18');
        customBackPlate.classList.add('w-100', 'h-18');
      }
    }
  
    // ✅ Function: Remove only size-related classes
    function removeSizeClasses(plate) {
      plate.classList.forEach((className) => {
        if (className.startsWith('w-') || className.startsWith('h-')) {
          plate.classList.remove(className);
        }
      });
    }
  
    // 🛠️ Event Listener for real-time size updates
    plateSizeSelector.addEventListener('change', updatePlateSize);
  
    // ✅ Apply default size on page load
    updatePlateSize();
  });
  

  //handling the custom plate border

  document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const borderSelector = document.getElementById('borderSelectorcustom');
  
    // Plate elements
    const customFrontPlate = document.getElementById('customPlateFront');
    const customBackPlate = document.getElementById('customPlateBack');
  
    // ✅ Function: Update border style (color and type) based on selection
    function updatePlateBorder() {
      const selectedBorder = borderSelector.value;
  
      // Remove existing border classes
      removeBorderClasses(customFrontPlate);
      removeBorderClasses(customBackPlate);
  
      // Apply the selected border style
      if (selectedBorder !== 'none') {
        customFrontPlate.classList.add(...selectedBorder.split(' '));
        customBackPlate.classList.add(...selectedBorder.split(' '));
      }
  
      // Apply the default width if no width is set
      applyBorderWidth(customFrontPlate, 1);
      applyBorderWidth(customBackPlate, 1);
    }
  
    // ✅ Function: Increase border width dynamically
    function increaseBorderWidth() {
      // Get current width from computed style
      const frontCurrentWidth = parseInt(getComputedStyle(customFrontPlate).borderWidth) || 0;
      const backCurrentWidth = parseInt(getComputedStyle(customBackPlate).borderWidth) || 0;
  
      // Increase width by 1px
      applyBorderWidth(customFrontPlate, frontCurrentWidth + 1);
      applyBorderWidth(customBackPlate, backCurrentWidth + 1);
    }
  
    // ✅ Function: Decrease border width dynamically
    function decreaseBorderWidth() {
      // Get current width from computed style
      const frontCurrentWidth = parseInt(getComputedStyle(customFrontPlate).borderWidth) || 0;
      const backCurrentWidth = parseInt(getComputedStyle(customBackPlate).borderWidth) || 0;
  
      // Decrease width by 1px (with a minimum of 0px)
      applyBorderWidth(customFrontPlate, Math.max(0, frontCurrentWidth - 1));
      applyBorderWidth(customBackPlate, Math.max(0, backCurrentWidth - 1));
    }
  
    // ✅ Function: Apply specific border width
    function applyBorderWidth(plate, width) {
      plate.style.borderWidth = `${width}px`;
    }
  
    // ✅ Function: Remove existing border classes
    function removeBorderClasses(plate) {
      plate.classList.forEach((className) => {
        if (className.startsWith('border') && !className.startsWith('border-width')) {
          plate.classList.remove(className);
        }
      });
    }
  
    // 🛠️ Event Listener for border style update
    borderSelector.addEventListener('change', updatePlateBorder);
  
    // 🛠️ Example key events to adjust border width dynamically
    document.addEventListener('keydown', (event) => {
      if (event.key === '+') {
        increaseBorderWidth(); // Increase width on pressing '+'
      } else if (event.key === '-') {
        decreaseBorderWidth(); // Decrease width on pressing '-'
      }
    });
  
    // ✅ Apply default border settings on page load
    updatePlateBorder();
  });

  

  //handling the custom plate fron and rare the plate on the rendering the front and backend

  const frontPlateStyleSelector = document.getElementById('frontPlateStyleSelector');
  console.log(frontPlateStyleSelector.value);

  document.getElementById("frontPlateStyleSelector").addEventListener("", function () {
    let selectedStyle = this.value;
    let selectedOption = this.options[this.selectedIndex].text;
    console.log(selectedOption);
    console.log(selectedStyle);
    let frontPlate = document.getElementById("customPlateFront");
    let backPlate = document.getElementById("customPlateBack");

    // Reset only style-related classes, keeping structure
    frontPlate.className = "font-bold text-2xl rounded-lg p-4 text-center";
    backPlate.className = "font-bold text-2xl rounded-lg p-4 text-center";

    // Apply new styles if not default
    if (selectedStyle !== "default") {
        frontPlate.classList.add(...selectedStyle.split(" "));
        backPlate.classList.add(...selectedStyle.split(" "));
    } else {
        // Default styles
        frontPlate.classList.add("bg-white", "text-black", "border", "border-gray-300");
        backPlate.classList.add("bg-yellow-400", "text-black", "border", "border-gray-300");
    }
});

//Handling the custom badges....



document.getElementById('badgeSelectors').addEventListener('change', function () {
    const selectedBadge = this.value;
    console.log(selectedBadge);
    const backBadge = document.getElementById('backBadgee');
    const frontBadge = document.getElementById('frontBadgee');
    
    if (selectedBadge === 'none') {
        backBadge.classList.add('hidden');
        frontBadge.classList.add('hidden');
        backBadge.src = '';
        frontBadge.src = '';
    } else {
        const badgePath = `images/${selectedBadge}`; // Path to the images folder
        backBadge.classList.remove('hidden');
        frontBadge.classList.remove('hidden');
        backBadge.src = badgePath;
        frontBadge.src = badgePath;
    }
});
