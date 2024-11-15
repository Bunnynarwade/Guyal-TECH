// Function to generate alphabet options for Letter 1 and Letter 2
function generateAlphabetOptions(groupId, selectId) {
    const container = document.getElementById(groupId);
    container.innerHTML = ''; // Clear any existing options
    const letterSelect = document.getElementById(selectId); // Get the element where the selected value will be stored

    for (let i = 65; i <= 90; i++) { // ASCII codes for A-Z
        const letter = String.fromCharCode(i);
        const option = document.createElement('div');
        option.classList.add('option');
        option.textContent = letter;
        option.setAttribute('data-value', letter); // Set value as a data attribute

        option.addEventListener('click', () => {
            // Remove 'selected' class from all options
            container.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            // Add 'selected' class to the clicked option
            option.classList.add('selected');

            // Access the value and pass it to letterSelect
            const selectedValue = option.getAttribute('data-value');
            letterSelect.value = selectedValue; // Set the value of letterSelect
            console.log('Selected Value:', selectedValue);

            updateImageUrl(); // Update the image URL whenever a selection is made
        });

        container.appendChild(option);
    }
}
updateImageUrl();
// Call the function for each section with the appropriate IDs
generateAlphabetOptions('letter1-options', 'letter1');
generateAlphabetOptions('letter2-options', 'letter2');

// Add selection functionality for metal options
document.querySelectorAll('#metal-options .metal-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('#metal-options .metal-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        updateImageUrl(); // Update the image URL whenever a metal option is selected
    });
});

// Function to update the image URL based on the selected options
function updateImageUrl() {
    // Get the selected values for Letter 1, Letter 2, and Metal
    const letter1 = document.getElementById('letter1').value ? `text0=${document.getElementById('letter1').value}` : '';
    const letter2 = document.getElementById('letter2').value ? `text1=${document.getElementById('letter2').value}` : '';

    // Ensure that the metal option is correctly retrieved, formatted (lowercase), and stripped of any surrounding whitespace
    const metal = document.querySelector('#metal-options .metal-option.selected')
        ? `material=${document.querySelector('#metal-options .metal-option.selected').textContent.trim().toLowerCase()}`
        : 'material=silver';  // Default value if no metal option is selected

    // Combine the query parameters into one string
    const query = [letter1, letter2, metal].filter(Boolean).join('&');

    // Logic to generate the image URL
    const baseUrl = `https://images.thepersonalizedbest.com/engrave.jpg?sku=4843&${query}`;

    // Update the image URL display dynamically
    const imageUrlDiv = document.getElementById('imageUrl');
    imageUrlDiv.innerHTML = `<img src="${baseUrl}" alt="Product Image">`;
}
