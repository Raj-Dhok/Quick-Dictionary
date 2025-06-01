# Quick Dictionary Chrome Extension 📖

A simple and lightweight Chrome extension that provides instant definitions for words on any webpage by double-clicking or highlighting them.

## Features

* **Instant Definitions:** Get definitions by simply double-clicking a word.
* **Highlight to Define:** Select any word with your mouse, and its definition will pop up.
* **Minimalist Design:** Clean and unobtrusive popup for quick lookups.

##  How to Install (Local Installation)

Since this extension is not yet available on the Chrome Web Store, you can install it directly from its files on your computer. Don't worry, it's easy!

1.  **Download the Extension Files:**
    * Go to the GitHub repository: [https://github.com/Raj-Dhok/Quick-Dictionary](https://github.com/Raj-Dhok/Quick-Dictionary)
    * Click the green **`< > Code`** button.
    * Select **"Download ZIP"**.
    * Once downloaded, unzip the file. You'll get a folder like `Quick-Dictionary-main`. Rename it to something simpler, like `MyDictionaryExtension`. **This is the folder you'll need.**

2.  **Enable Developer Mode in Chrome:**
    * Open your Chrome browser.
    * Type `chrome://extensions` into the address bar and press `Enter`.
    * In the top right corner of the Extensions page, you'll see a toggle switch labeled **"Developer mode"**. Make sure this is **ON**.

3.  **Load the Extension:**
    * With "Developer mode" on, you'll see a new button in the top left called **"Load unpacked"**. Click it.
    * A file dialog box will appear. Navigate to and **select the `MyDictionaryExtension` folder** (the one you unzipped and renamed earlier).
    * Click **"Select Folder"** or **"Open"**.

4.  **You're Done!**
    * Your "Quick Dictionary" extension should now appear in the list of extensions.
    * (Optional) You can click the puzzle piece icon (Extensions icon) in your Chrome toolbar and then click the **pin icon** next to "Quick Dictionary" to make it visible in your toolbar.

## How to Use

1.  Once installed, open **any webpage** in a new tab.
2.  **Double-click** any word on the page.
3.  Alternatively, **highlight** (click and drag your mouse over) a single word and then release the mouse button.

A small popup will appear near the word with its definition! To close the popup, simply click anywhere outside of it.

## Technologies Used

* HTML
* CSS (injected via JavaScript for the popup styling)
* JavaScript
* Dictionary API: `https://api.dictionaryapi.dev/`

## Contributing

Feel free to fork this repository, make improvements, and submit pull requests.
