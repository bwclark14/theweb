// Initialize HTML editor with Ace
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
htmlEditor.setOptions({ fontSize: "14px", showPrintMargin: false, wrap: true, showLineNumbers: true, tabSize: 2 });

// Initialize CSS editor
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

// Add more CSS styling here...
`);
cssEditor.setOptions({ fontSize: "14px", showPrintMargin: false, wrap: true, showLineNumbers: true, tabSize: 2 });

// Initialize JavaScript editor
const jsEditor = ace.edit("js-editor");
jsEditor.setTheme("ace/theme/dracula");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.setValue(`
const factButton = document.getElementById("fact-button");
// JavaScript code here...

factButton.addEventListener("click", function() {
  // Implement the fact logic here
});
`);
jsEditor.setOptions({ fontSize: "14px", showPrintMargin: false, wrap: true, showLineNumbers: true, tabSize: 2 });

// Encode and Decode functions for Base64
function toBase64(str) { return btoa(unescape(encodeURIComponent(str))); }
function fromBase64(base64Str) { return decodeURIComponent(escape(atob(base64Str))); }

// Update the URL with Base64-encoded editor content
function updateUrl() {
    const encodedHtml = toBase64(htmlEditor.getValue());
    const encodedCss = toBase64(cssEditor.getValue());
    const encodedJs = toBase64(jsEditor.getValue());
    const shareableUrl = `${window.location.origin}?html=${encodedHtml}&css=${encodedCss}&js=${encodedJs}`;
    document.getElementById("share-url-text").innerHTML = `<a href="${shareableUrl}" target="_blank">${shareableUrl}</a>`;
}

// Load content from the URL on page load
function loadContentFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const htmlContent = params.get('html'), cssContent = params.get('css'), jsContent = params.get('js');
    if (htmlContent) htmlEditor.setValue(fromBase64(htmlContent), -1);
    if (cssContent) cssEditor.setValue(fromBase64(cssContent), -1);
    if (jsContent) jsEditor.setValue(fromBase64(jsContent), -1);
    updatePreview(); // Refresh preview with loaded content
}

// Consolidated updatePreview function
function updatePreview() {
    const fullContent = `${htmlEditor.getValue()}<style>${cssEditor.getValue()}</style><script>${jsEditor.getValue()}<\/script>`;
    document.getElementById('preview').srcdoc = fullContent;
}

// Popout window functionality
document.getElementById("popoutBtn").addEventListener("click", () => {
    const fullContent = `${htmlEditor.getValue()}<style>${cssEditor.getValue()}</style><script>${jsEditor.getValue()}<\/script>`;
    const previewBlob = new Blob([fullContent], { type: 'text/html' });
    const previewUrl = URL.createObjectURL(previewBlob);
    const popoutWindow = window.open(previewUrl, '_blank');
    if (!popoutWindow) alert("Please allow pop-ups to open the preview.");
});

// Tab switching functionality
const tabButtons = document.querySelectorAll(".tab-button");
tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".code-editor").forEach(editor => editor.classList.remove("active"));
        button.classList.add("active");
        document.getElementById(button.getAttribute("data-tab") + "-editor").classList.add("active");
    });
});

// Event listeners to update preview and URL dynamically as you type
htmlEditor.session.on('change', updatePreview);
cssEditor.session.on('change', updatePreview);
jsEditor.session.on('change', updatePreview);

// Event listener for "Generate Shareable URL" button
document.getElementById("shareBtn").addEventListener("click", updateUrl);

// Load content from URL and local storage when the page loads
window.addEventListener("load", loadContentFromUrl);
window.addEventListener("load", () => {
    const savedHtml = localStorage.getItem("htmlContent");
    if (savedHtml) htmlEditor.setValue(savedHtml, -1);
    const savedCss = localStorage.getItem("cssContent");
    if (savedCss) cssEditor.setValue(savedCss, -1);
    const savedJs = localStorage.getItem("jsContent");
    if (savedJs) jsEditor.setValue(savedJs, -1);
    updatePreview(); // Update preview with loaded data
});
