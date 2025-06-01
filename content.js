// Function to remove any existing dictionary popups
function removeExistingPopup() {
    const existingPopup = document.getElementById('dictionary-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
}

// Function to create and display the definition popup
function displayPopup(word, definition, rect, isError = false) {
    const popup = document.createElement('div');
    popup.id = 'dictionary-popup'; // Assign an ID for easy removal later
    popup.style.cssText = `
        position: absolute;
        background-color: ${isError ? '#ffebeb' : '#fff'}; /* Lighter red for errors */
        border: 1px solid ${isError ? '#ff0000' : '#ccc'}; /* Red border for errors */
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 99999; /* Ensure it's on top of most elements */
        max-width: 300px;
        font-family: sans-serif;
        font-size: 14px;
        color: ${isError ? '#cc0000' : '#333'}; /* Darker red for error text */
        word-wrap: break-word; /* Ensure long words wrap */
        line-height: 1.4;
    `;
    popup.innerHTML = `<strong>${word}</strong>: ${definition}`;

    // Position the popup near the selected text
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`; // 5px below the selection
    popup.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(popup);

    function handleDocumentClick(e) {
        if (!popup.contains(e.target) && e.target !== popup) {
            removeExistingPopup();
            document.removeEventListener('click', handleDocumentClick);
        }
    }

    setTimeout(() => {
        document.addEventListener('click', handleDocumentClick);
    }, 100);
}

// Function to fetch and display the definition
async function fetchAndDisplayDefinition(word, rect) {
    removeExistingPopup(); // Always remove existing popups before fetching a new definition

    // Show a "Loading..." message quickly for immediate feedback
    displayPopup(word, "Loading definition...", rect);

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        // Check for API errors or if no definitions are found
        if (!response.ok || !data || data.length === 0 || data.title === "No Definitions Found") {
            displayPopup(word, "No definition found for this word.", rect, true); // Display error message
            return; // Stop execution here
        }

        // Extract the first available definition
        let definition = "Definition not available."; // Default message if extraction fails
        if (data[0].meanings && data[0].meanings.length > 0) {
            const firstMeaning = data[0].meanings[0];
            if (firstMeaning.definitions && firstMeaning.definitions.length > 0) {
                definition = firstMeaning.definitions[0].definition;
                // Add part of speech if available for better context
                if (firstMeaning.partOfSpeech) {
                    definition = `(${firstMeaning.partOfSpeech}) ${definition}`;
                }
            }
        } else if (data[0].phonetic) { // Sometimes only phonetic transcription is available
             definition = `Pronunciation: ${data[0].phonetic}`;
        }

        // Display the actual definition
        displayPopup(word, definition, rect);

    } catch (error) {
        console.error("Error fetching definition:", error);
        // Display a generic error message for network or parsing issues
        displayPopup(word, "Failed to fetch definition. Please check your internet connection or try again.", rect, true);
    }
}

// Listen for the 'mouseup' event on the entire document (for text selection)
document.addEventListener('mouseup', async (event) => {
    
    // Ensure it's a left-click (primary button)
    if (event.button !== 0) {
        // console.log("Not a left-click, ignoring.");
        removeExistingPopup();
        return; // Exit if not left-click
    }

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // console.log("Selected text (trimmed):", `"${selectedText}"`); 
    // console.log("Selected text length:", selectedText.length);

    // Check primary conditions: text selected and not too long
    if (selectedText.length > 0 && selectedText.length < 50) {
        // console.log("Primary conditions (length > 0, length < 50) met.");

        // Basic regex to ensure it's likely a word (letters, apostrophes only)
        const isWordLike = selectedText.match(/^[a-zA-Z']+$/);
        console.log("Regex match result:", isWordLike); // Log 6: Show regex result

        if (isWordLike) {
            // console.log("Text passed word-like regex. Fetching definition...");
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            fetchAndDisplayDefinition(selectedText.toLowerCase(), rect);
        } else {
            // console.log("Text did NOT pass word-like regex. Removing popup.");
            removeExistingPopup();
        }
    } else {
        // console.log("Primary conditions NOT met (no text, or too long). Removing popup.");
        removeExistingPopup();
    }
});

// Listen for double-click specifically (often preferred for dictionary lookups)
document.addEventListener('dblclick', async (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // The dblclick listener has slightly stricter conditions to ensure a precise single word lookup
    if (selectedText.length > 0 && selectedText.length < 50 && selectedText.split(' ').length === 1) {
         if (selectedText.match(/^[a-zA-Z']+$/)) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            fetchAndDisplayDefinition(selectedText.toLowerCase(), rect);
        } else {
            removeExistingPopup();
        }
    } else {
        removeExistingPopup();
    }
});

//Remove popup if user scrolls or resizes window to prevent misalignment
document.addEventListener('scroll', removeExistingPopup);
window.addEventListener('resize', removeExistingPopup);