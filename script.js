// Initialize Ace editor for HTML
const htmlEditor = ace.edit("html-editor");
htmlEditor.setTheme("ace/theme/twilight");
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
cssEditor.setTheme("ace/theme/twilight");
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
jsEditor.setTheme("ace/theme/twilight");
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
    image: "https://tse4.mm.bing.net/th/id/OIP.m5as9dHqt-bfi7flxbBeWgHaD6?w=338&h=226&c=7&r=0&o=5&dpr=1.4&pid=1.7"
  }
];

// Set initial fact
let currentFactIndex = 0;
factText.innerText = originalFacts[currentFactIndex].text;
factImage.src = originalFacts[currentFactIndex].image;

// Event listener for Fact button
factButton.addEventListener("click", () => {
  currentFactIndex = (currentFactIndex + 1) % originalFacts.length;
  factText.innerText = originalFacts[currentFactIndex].text;
  factImage.src = originalFacts[currentFactIndex].image;
});

// Event listener for Reset button
resetButton.addEventListener("click", () => {
  currentFactIndex = 0;
  factText.innerText = originalFacts[currentFactIndex].text;
  factImage.src = originalFacts[currentFactIndex].image;
});
`);
jsEditor.setOptions({
    fontSize: "14px",
    showPrintMargin: false,
    wrap: true,
    showLineNumbers: true,
    tabSize: 2
});

// Function to update the preview iframe dynamically based on editor content
function updatePreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const iframe = document.getElementById('preview');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    iframeDocument.open();
    iframeDocument.write(`
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
    `);
    iframeDocument.close();
}

// Initialize the preview with the default content
updatePreview();

// Event listeners for file upload, popout, and download
document.getElementById('uploadBtn').addEventListener('change', handleFileUpload);
document.getElementById('popoutBtn').addEventListener('click', popoutPreview);
document.getElementById('downloadBtn').addEventListener('click', downloadCode);

// File upload handler
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'text/html') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const htmlContent = e.target.result;
            htmlEditor.setValue(htmlContent);
            updatePreview();
        };
        reader.readAsText(file);
    }
}

// Popout preview in a new window
function popoutPreview() {
    const previewWindow = window.open('', 'Preview', 'width=800,height=600');
    previewWindow.document.write('<html><head><title>Preview</title></head><body></body></html>');
    const iframe = previewWindow.document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    previewWindow.document.body.appendChild(iframe);

    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(`
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
    `);
    iframeDocument.close();
}

// Download code as a ZIP
function downloadCode() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file("styles.css", css);
    zip.file("script.js", js);

    zip.generateAsync({ type: "blob" }).then(function(content) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "project.zip";
        link.click();
    });
}
