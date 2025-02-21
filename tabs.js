document.addEventListener('DOMContentLoaded', () => {
    // Tab Elements
    const legalTab = document.getElementById('legalTab');
    const customTab = document.getElementById('customTab');
    const legalPlates = document.getElementById('legalPlates');
    const customPlates = document.getElementById('customPlates');
  
    // Input Elements
    const legalInput = document.querySelector('#legalPlates input[type="text"]');
    const customInput = document.querySelector('#customPlates input[type="text"]');
  
    // Preview Elements
    const legalPreviews = legalPlates.querySelectorAll('.space-y-4 div');
    const customPreviews = customPlates.querySelectorAll('.space-y-4 div');
  
    // Tab Switching Logic
    legalTab.addEventListener('click', () => {
      legalTab.classList.add('text-white', 'border-yellow-400');
      customTab.classList.remove('text-white', 'border-yellow-400');
      customTab.classList.add('text-gray-400');
      legalPlates.classList.remove('hidden');
      customPlates.classList.add('hidden');
    });
  
    customTab.addEventListener('click', () => {
      customTab.classList.add('text-white', 'border-yellow-400');
      legalTab.classList.remove('text-white', 'border-yellow-400');
      legalTab.classList.add('text-gray-400');
      customPlates.classList.remove('hidden');
      legalPlates.classList.add('hidden');
    });
  
    // Dynamic Update for Legal Plates
    legalInput.addEventListener('input', (e) => {
      const value = e.target.value.toUpperCase() || 'OG51 GNS';
      legalPreviews.forEach((preview) => {
        preview.textContent = value;
      });
    });
  
    // Dynamic Update for Custom Plates
    customInput.addEventListener('input', (e) => {
      const value = e.target.value.toUpperCase() || 'CUSTOM TXT';
      customPreviews.forEach((preview) => {
        preview.textContent = value;
      });
    });
  });
  

  //Handling of the Border

  document.addEventListener('DOMContentLoaded', () => {
    const borderSelector = document.getElementById('borderSelector');
    const frontPlate = document.getElementById('customLegalplateFront');
    const backPlate = document.getElementById('customLegalplateBack');
  
    // Function to update the border
    function updateBorder() {
      const selectedBorder = borderSelector.value;
  
      // Reset existing border classes
      frontPlate.className = 'bg-white text-black font-bold text-2xl rounded-lg p-4 text-center overflow-hidden';
      backPlate.className = 'bg-yellow-400 text-black font-bold text-2xl rounded-lg p-4 text-center overflow-hidden';
  
      // Apply selected border class
      if (selectedBorder !== 'none') {
        frontPlate.classList.add(...selectedBorder.split(' '));
        backPlate.classList.add(...selectedBorder.split(' '));
      }
    }
  
    // Listen for changes on the border dropdown
    borderSelector.addEventListener('change', updateBorder);
  });
  

//Handling of the Badges

document.addEventListener('DOMContentLoaded', () => {
    const badgeSelector = document.getElementById('badgeSelector');
    const frontBadge = document.getElementById('frontBadge');
    const backBadge = document.getElementById('backBadge');
  
    // Function to update badge images
    function updateBadge() {
      const selectedBadge = badgeSelector.value;
  
      if (selectedBadge !== 'none') {
        // Set the image source (assuming images are stored in an 'images' folder)
        frontBadge.src = `images/${selectedBadge}`;
        backBadge.src = `images/${selectedBadge}`;
  
        // Show the badge images
        frontBadge.classList.remove('hidden');
        backBadge.classList.remove('hidden');
      } else {
        // Hide the badges if 'No Badge' is selected
        frontBadge.classList.add('hidden');
        backBadge.classList.add('hidden');
      }
    }
  
    // Listen for changes on the badge dropdown
    badgeSelector.addEventListener('change', updateBadge);
  });
  
//Ev strips Handling

document.addEventListener('DOMContentLoaded', () => {
    const evStripSelector = document.getElementById('evStripSelector');
  
    const frontEVStrip = document.getElementById('frontEVStrip');
    const backEVStrip = document.getElementById('backEVStrip');
  
    const frontPlateContainer = frontEVStrip.parentElement;
    const backPlateContainer = backEVStrip.parentElement;
  
    // Function to update EV strip color and height dynamically
    function updateEVStrip() {
      const selectedClass = evStripSelector.value;
  
      // Reset existing strip styles
      frontEVStrip.className = 'w-4 transition-all duration-300 rounded-l-lg';
      backEVStrip.className = 'w-4 transition-all duration-300 rounded-l-lg';
  
      // Apply selected EV strip color if not 'none'
      if (selectedClass !== 'none') {
        frontEVStrip.classList.add(...selectedClass.split(' '));
        backEVStrip.classList.add(...selectedClass.split(' '));
  
        // Dynamically set a larger height for the EV strips using inline styles
        frontEVStrip.style.height = '100px'; // Increase to desired height
        backEVStrip.style.height = '100px'; // Increase to desired height
  
        // Adjust plate container height as needed
        frontPlateContainer.classList.add('h-32'); // Make the plate taller
        backPlateContainer.classList.add('h-32'); // Make the plate taller
      } else {
        // Remove the strip color and reset the height
        frontEVStrip.classList.add('bg-transparent');
        backEVStrip.classList.add('bg-transparent');
  
        // Reset the height for EV strips
        frontEVStrip.style.height = '0';
        backEVStrip.style.height = '0';
  
        // Reset the plate height
        frontPlateContainer.classList.remove('h-32');
        backPlateContainer.classList.remove('h-32');
      }
    }
  
    // Event listener for EV strip selection
    evStripSelector.addEventListener('change', updateEVStrip);
  });

//Handling the plate style

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const frontPlateStyleSelector = document.getElementById('frontPlateStyleSelector');
    const backPlateStyleSelector = document.getElementById('backPlateStyleSelector');
    const frontRearSelector = document.getElementById('frontRearSelector');
  
    // Plates
    const frontPlate = document.getElementById('customLegalplateFront');
    const backPlate = document.getElementById('customLegalplateBack');
  
    // Function to apply styles based on the selected scope
    function applyStyleToPlates(scope, selectedStyle) {
      if (scope === 'Front & Rear') {
        applyStyle(frontPlate, selectedStyle, 'front');
        applyStyle(backPlate, selectedStyle, 'back');
      } else if (scope === 'Front') {
        applyStyle(frontPlate, selectedStyle, 'front');
      } else if (scope === 'Rear') {
        applyStyle(backPlate, selectedStyle, 'back');
      }
    }
  
    // Function to apply the selected style
    function applyStyle(plateElement, selectedStyle, type) {
      // Reset styles for the plate
      plateElement.className = 'flex items-center justify-center font-bold text-2xl rounded-lg p-4 text-center overflow-hidden';
  
      // Apply style if not default
      if (selectedStyle !== 'default') {
        plateElement.classList.add(...selectedStyle.split(' '));
      } else {
        // Apply default styles
        if (type === 'front') {
          plateElement.classList.add('bg-white', 'text-black', 'border', 'border-gray-300');
        } else {
          plateElement.classList.add('bg-yellow-400', 'text-black', 'border', 'border-gray-300');
        }
      }
    }
  
    // Function to update styles dynamically
    function updatePlateStyles() {
      const scope = frontRearSelector.value;
      const frontStyle = frontPlateStyleSelector.value;
      const backStyle = backPlateStyleSelector.value;
  
      if (scope === 'Front & Rear') {
        applyStyleToPlates(scope, frontStyle);
      } else if (scope === 'Front') {
        applyStyle(frontPlate, frontStyle, 'front');
      } else if (scope === 'Rear') {
        applyStyle(backPlate, backStyle, 'back');
      }
    }
  
    // Event listeners for all selectors
    frontPlateStyleSelector.addEventListener('change', updatePlateStyles);
    backPlateStyleSelector.addEventListener('change', updatePlateStyles);
    frontRearSelector.addEventListener('change', updatePlateStyles);
  
    // Apply default styles on page load
    updatePlateStyles();
  });
  
//Handling the size for plates

document.addEventListener('DOMContentLoaded', () => {
    const plateSizeSelector = document.getElementById('plateSizeSelector');
  
    const frontPlate = document.getElementById('customLegalplateFront');
    const backPlate = document.getElementById('customLegalplateBack');
  
    // Set your desired default size here
    const defaultSize = 'w-100 h-18'; // Default: Standard 520x111mm
    let hasUserSelectedSize = false; // Track if user has made a selection
  
    // Function to apply the default size
    function applyDefaultSize() {
      // Remove existing size-related classes
      removeSizeClasses(frontPlate);
      removeSizeClasses(backPlate);
  
      // Apply the default size
      frontPlate.classList.add(...defaultSize.split(' '));
      backPlate.classList.add(...defaultSize.split(' '));
    }
  
    // Function to update only the size-related classes dynamically
    function updatePlateSize() {
      const selectedSize = plateSizeSelector.value;
  
      if (selectedSize === 'default') {
        applyDefaultSize(); // Apply default size
      } else {
        hasUserSelectedSize = true;
  
        // Remove existing size-related classes
        removeSizeClasses(frontPlate);
        removeSizeClasses(backPlate);
  
        // Apply the selected size
        frontPlate.classList.add(...selectedSize.split(' '));
        backPlate.classList.add(...selectedSize.split(' '));
      }
    }
  
    // Function to remove size-related classes (width & height only)
    function removeSizeClasses(plate) {
      plate.classList.forEach((className) => {
        if (className.startsWith('w-') || className.startsWith('h-')) {
          plate.classList.remove(className);
        }
      });
    }
  
    // Event listener for plate size change
    plateSizeSelector.addEventListener('change', updatePlateSize);
  
    // Apply the default size on page load
    applyDefaultSize();
  });
  