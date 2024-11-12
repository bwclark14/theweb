// Initialize Ace editor for HTML
const htmlEditor = ace.edit("html-editor");
htmlEditor.setTheme("ace/theme/dracula");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.setValue(`
<body>
  <div class="container">  
    <h1 id="fact-title">This is a website</h1>
    <p> By Me</p>  
    <p id="fact-text"></p>
    <img id="fact-image" src="https://tinyurl.com/csfact101"> 
    <div id="button-container">
      <button id="fact-button">Fact</button>
      <button id="reset-button">Reset</button>
    </div>  
    <p>something can go here</p>
  </div>
</body>
`);
htmlEditor.setOptions({
    fontSize: "14px",
    showPrintMargin: false,
    wrap: true,
    showLineNumbers: true,
    tabSize: 2
});

// Initialize Ace editor for CSS
const cssEditor = ace.edit("css-editor");
cssEditor.setTheme("ace/theme/dracula");
cssEditor.session.setMode("ace/mode/css");
cssEditor.setValue(`
body {
  background-color: purple;
}

.container {
  text-align: center;
  margin: 30px;
  background-color: white;
  border-radius: 0px;
  border: dotted;
  border-color: purple;
  border-width: 3px;
}

#fact-title {
  font-size: 16px;
  font-weight: bold;
  font-family: Arial;
  color: red;
}

#fact-text {
  font-family: Arial;
  font-size: 16pt;
  margin-bottom: 20px;
}

#fact-image {
  max-width: 300px;
  height: auto;
  border-radius: 0px;
  border: solid;
  border-width: 1px;
  border-style: solid;
}

#fact-button {
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 0px;
  box-shadow: 5px 5px lightblue;
  margin: 10px;
}

#reset-button {
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  background-color: darkblue;
  color: white;
  border: none;
  border-radius: 0px;
  box-shadow: 5px 5px lightblue;
  margin: 10px;
}
`);
cssEditor.setOptions({
    fontSize: "14px",
    showPrintMargin: false,
    wrap: true,
    showLineNumbers: true,
    tabSize: 2
});

// Initialize Ace editor for JavaScript
const jsEditor = ace.edit("js-editor");
jsEditor.setTheme("ace/theme/dracula");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.setValue(`
const factButton = document.getElementById("fact-button");
const resetButton = document.getElementById("reset-button");
const factText = document.getElementById("fact-text");
const factImage = document.getElementById("fact-image");

// Original facts array to reset
const originalFacts = [
  {
    text: "The first computer virus was created in 1982.",
    image: "https://tse4.mm.bing.net/th/id/OIP.A841fIv6sL9hMwLaLGuQDAHaDt?w=310&h=175&c=7&r=0&o=5&dpr=1.4&pid=1.7"
  },
  {
    text: "The number of emails sent and received per day in 2024 is 361.6 billion.",
    image: "https://cdn.shopify.com/s/files/1/0840/8370/3830/articles/1701784225-number-of-emails-sent-and-received-per-day-2023-2027.png?v=1714654437"
  },
  {
    text: "The internet was originally developed for military use.",
    image: "https://tse4.mm.bing.net/th/id/OIP.m5as9dHqt3CrZQGua_EZWgHaD2?w=318&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7"
  },
  {
    text: "The first computer game was called Spacewar! and was created in 1962.",
    image: "https://tse1.mm.bing.net/th/id/OIP.AZJ3rV7_IN1PUdAuPYUazAHaEK?w=1280&h=720&rs=1&pid=ImgDetMain"
  },
  {
    text: "The first programmable and digital computer, ENIAC (Electronic Numerical Integrator and Computer), was developed in 1945",
    image: "https://th.bing.com/th/id/R.39f00ad246b0328b29ae9ed6de30afcf?rik=BtVkVuZJj47oqw&pid=ImgRaw&r=0"
  }
];

// Clone original facts to a new array for manipulation
let facts = [...originalFacts];

// Default image to restore when reset is pressed
const defaultImageUrl = "https://tinyurl.com/csfact101";

function getRandomFact() {
  if (facts.length === 0) {
    factText.textContent = "All facts have been shown!";
    factImage.src = ""; // Optionally clear the image when no facts are left
    factButton.disabled = true; // Disable the button when out of facts
    return;
  }

  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts.splice(randomIndex, 1)[0]; // Remove the fact from the array
  factText.textContent = randomFact.text;
  factImage.src = randomFact.image;
}

function resetFacts() {
  facts = [...originalFacts]; // Reset facts array to original
  factText.textContent = ""; // Clear fact text
  factImage.src = defaultImageUrl; // Restore default image
  factButton.disabled = false; // Re-enable the Show Fact button
}

// Event listeners
factButton.addEventListener("click", getRandomFact);
resetButton.addEventListener("click", resetFacts);
`);

// Set options for JavaScript editor
jsEditor.setOptions({
    fontSize: "14px",
    showPrintMargin: false,
    wrap: true,
    showLineNumbers: true,
    tabSize: 2
});

// Function to encode content to Base64
function toBase64(str) {
    return btoa(unescape(encodeURIComponent(str))); // Convert to Base64
}

// Function to decode Base64 content
function fromBase64(base64Str) {
    return decodeURIComponent(escape(atob(base64Str))); // Convert from Base64
}

// Function to update the URL dynamically
function updateUrl() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = cssEditor.getValue();
    const jsContent = jsEditor.getValue();

    // Encode the content to Base64
    const encodedHtml = toBase64(htmlContent);
    const encodedCss = toBase64(cssContent);
    const encodedJs = toBase64(jsContent);

    // Create the shareable URL
    const shareableUrl = `${window.location.origin}?html=${encodedHtml}&css=${encodedCss}&js=${encodedJs}`;

    // Update the URL in the browser's address bar without reloading the page
    window.history.replaceState(null, "", shareableUrl);

    // Display the shareable URL to the user
    const shareUrlText = document.getElementById("share-url-text");
    shareUrlText.innerHTML = `Your Shareable URL: <a href="${shareableUrl}" target="_blank">${shareableUrl}</a>`;
}

// Function to load content from the URL and decode it
function loadFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    const encodedHtml = urlParams.get("html");
    const encodedCss = urlParams.get("css");
    const encodedJs = urlParams.get("js");

    if (encodedHtml && encodedCss && encodedJs) {
        // Decode and set the content in the editors
        htmlEditor.setValue(fromBase64(encodedHtml));
        cssEditor.setValue(fromBase64(encodedCss));
        jsEditor.setValue(fromBase64(encodedJs));

        // Update the preview
        updatePreview();
    }
}

// Function to update the live preview
function updatePreview() {
    const previewIframe = document.getElementById("preview-iframe");
    const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(htmlEditor.getValue());
    iframeDoc.write("<style>" + cssEditor.getValue() + "</style>");
    iframeDoc.write("<script>" + jsEditor.getValue() + "<\/script>");
    iframeDoc.close();
}

// Event listeners for content change in editors
htmlEditor.getSession().on("change", updateUrl);
cssEditor.getSession().on("change", updateUrl);
jsEditor.getSession().on("change", updateUrl);

// Initialize preview
updatePreview();

// Load content from the URL if present
window.addEventListener("load", loadFromUrl);
