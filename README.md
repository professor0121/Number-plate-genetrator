# Number-plate-genetrator
# Number Plate Generator

## Overview

The Number Plate Generator is a web application that allows users to design and customize number plates for vehicles. Users can choose between legal plates and custom plates, and customize various aspects such as font size, font style, font color, plate style, plate size, border, badge, and electric vehicle strip.

## Features

- **Tab Switching**: Switch between Legal Plates and Custom Plates tabs.
- **Dynamic Updates**: Real-time updates for plate text, font styles, plate styles, sizes, borders, badges, and EV strips.
- **Live Preview**: See a live preview of the designed plates.

## File Structure
images/ index.html README.md tab_custom.js tabs.js


## Files

### `index.html`

This file contains the HTML structure of the application, including the tabs for Legal Plates and Custom Plates, and the various input elements for customization.

### `tabs.js`

This file handles the functionality for the Legal Plates tab, including:

- Tab switching logic
- Dynamic updates for legal plate text
- Handling of borders, badges, and EV strips

### `tab_custom.js`

This file handles the functionality for the Custom Plates tab, including:

- Font controls (size, style, color)
- Plate style updates
- Plate size updates
- Border updates
- Badge updates

## Usage

1. **Open the Application**: Open `index.html` in a web browser.
2. **Switch Tabs**: Click on the "Legal Plates" or "Custom Plates" tab to switch between them.
3. **Customize Plates**:
   - For Legal Plates:
     - Enter the registration number.
     - Select front and rear plate styles.
     - Choose plate size, border, badge, and EV strip.
   - For Custom Plates:
     - Enter custom text.
     - Select font size, style, and color.
     - Choose plate style, size, border, and badge.
4. **Live Preview**: See the live preview of the designed plates on the right panel.
5. **Add to Cart**: Click the "Add to Cart" button to add the designed plate to the cart.

## Example

Here is an example of how to use the application:

1. Open `index.html` in a web browser.
2. Click on the "Custom Plates" tab.
3. Enter "MYPLATE" in the custom text input.
4. Select "Large" from the font size dropdown.
5. Choose "Bold" from the font style dropdown.
6. Pick a color from the font color picker.
7. Select "3D Style" from the plate style dropdown.
8. Choose a plate size from the size dropdown.
9. Select a border style from the border dropdown.
10. Choose a badge from the badge dropdown.
11. See the live preview of the custom plate on the right panel.
12. Click "Add to Cart" to add the plate to the cart.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.