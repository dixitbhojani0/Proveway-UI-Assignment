// To fetch selected unit & items value
function getUnitSelections(box) {
    const selections = {};
    const unitRows = box.querySelectorAll('.size-color-row');

    unitRows.forEach(row => {
        const unitNumber = row.querySelector('.size-number')?.textContent;
        const size = row.querySelector('.size-dropdown')?.value;
        const color = row.querySelector('.color-dropdown')?.value;

        if (unitNumber) {
            selections[unitNumber] = { size, color };
        }
    });

    return selections;
}

document.addEventListener('DOMContentLoaded', function () {
    const productBoxes = document.querySelectorAll('.product-box');
    const totalPriceElement = document.getElementById('total-price');
    const addToCartButton = document.querySelector('.add-to-cart');

    let selectedBox = document.querySelector('.product-box.popular');

    // Box selection
    productBoxes.forEach(box => {
        // Add click handler for each product box
        box.addEventListener('click', function (e) {
            // Don't trigger box selection when clicking on dropdowns
            if (e.target.tagName === 'SELECT') return;

            // Skip if this box is already active
            if (box === selectedBox) return;

            // Toggle the clicked box
            if (box.classList.contains('active')) {
                box.classList.remove('active');
                box.setAttribute('aria-checked', 'false');
                selectedBox = null;
            } else {
                // Close all boxes first
                productBoxes.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-checked', 'false');
                });
                // Open the selected box
                box.classList.add('active');
                box.setAttribute('aria-checked', 'true');

                // Check the corresponding radio input
                const radio = box.querySelector('.radio-check');
                if (radio) radio.checked = true;

                selectedBox = box;
                // Update total price
                totalPriceElement.textContent = `$${box.dataset.price}`;
            }
        });
    });

    // Add to cart button
    addToCartButton.addEventListener('click', function () {
        // Fetch selected values for cart
        const unitSelections = getUnitSelections(selectedBox);
        let validSelections = '';

        for (const [unitNum, { size, color }] of Object.entries(unitSelections)) {
            if (size && color) {
                validSelections += `Unit ${unitNum}: Size ${size}, Color ${color}\n`;
            }
        }

        if (validSelections) {
            alert(`Added to cart:\n${validSelections}Total: $${selectedBox.dataset.price}`);
        } else {
            alert('Please select size and color for at least one unit');
        }
    });
});