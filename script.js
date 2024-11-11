// Load Ace language tools for autocomplete, snippets, and Emmet support
ace.require("ace/ext/language_tools");
const emmet = ace.require("ace/ext/emmet");

// Default user preferences and load saved preferences if available
const userPreferences = {
    theme: localStorage.getItem("theme") || "ace/theme/dracula",
    fontSize: localStorage.getItem("fontSize") || "14px"
};

// Initialize and configure Ace editors
function initializeEditor(editor, mode, initialValue) {
    editor.session.setMode(mode);
    editor.setTheme(userPreferences.theme);
    editor.setOptions({
        fontSize: userPreferences.fontSize,
        showPrintMargin: false,
        wrap: true,
        showLineNumbers: true,
        tabSize: 2,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        useEmmet: true
    });
    editor.setValue(initialValue, -1);
}

// HTML Editor Initialization
const htmlEditor = ace.edit("html-editor");
initializeEditor(htmlEditor, "ace/mode/html", `
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

// CSS Editor Initialization
const cssEditor = ace.edit("css-editor");
initializeEditor(cssEditor, "ace/mode/css", `
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
}

#fact-button, #reset-button {
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  box-shadow: 5px 5px lightblue;
  margin: 10px;
}

#fact-button { background-color: green; }
#reset-button { background-color: darkblue; }
`);

// JS Editor Initialization
const jsEditor = ace.edit("js-editor");
initializeEditor(jsEditor, "ace/mode/javascript", `
const factButton = document.getElementById("fact-button");
const resetButton = document.getElementById("reset-button");
const factText = document.getElementById("fact-text");
const factImage = document.getElementById("fact-image");

const originalFacts = [
  { text: "The first computer virus was created in 1982.", image: "https://tse4.mm.bing.net/th/id/OIP.A841fIv6sL9hMwLaLGuQDAHaDt?w=310&h=175&c=7&r=0&o=5&dpr=1.4&pid=1.7" },
  { text: "The number of emails sent per day is 361.6 billion in 2024.", image: "https://cdn.shopify.com/s/files/1/0840/8370/3830/articles/1701784225-number-of-emails-sent-and-received-per-day-2023-2027.png?v=1714654437" },
  { text: "The internet was developed for military use.", image: "https://tse4.mm.bing.net/th/id/OIP.m5as9dHqt3CrZQGua_EZWgHaD2?w=318&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7" }
];

let facts = [...originalFacts];
const defaultImageUrl = "https://tinyurl.com/csfact101";

function getRandomFact() {
  if (facts.length === 0) {
    factText.textContent = "All facts have been shown!";
    factImage.src = "";
    factButton.disabled = true;
    return;
  }
  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts.splice(randomIndex, 1)[0];
  factText.textContent = randomFact.text;
  factImage.src = randomFact.image;
}

function resetFacts() {
  facts = [...originalFacts];
  factText.textContent = "";
  factImage.src = defaultImageUrl;
  factButton.disabled = false;
}

factButton.addEventListener("click", getRandomFact);
resetButton.addEventListener("click", resetFacts);
`);

// Function to update the preview iframe with combined HTML, CSS, and JS content
function updatePreview() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = `<script>${jsEditor.getValue()}</script>`;
    const fullContent = `${htmlContent} ${cssContent} ${jsContent}`;

    const previewFrame = document.getElementById('preview');
    previewFrame.srcdoc = fullContent;
    saveContentToLocalStorage();
}

// Code Beautify Function
function beautifyCode() {
    htmlEditor.setValue(html_beautify(htmlEditor.getValue()), -1);
    cssEditor.setValue(css_beautify(cssEditor.getValue()), -1);
    jsEditor.setValue(js_beautify(jsEditor.getValue()), -1);
}

// Color Picker Setup
const pickr = Pickr.create({
    el: '#color-picker',
    theme: 'classic',
    default: '#000000',
    swatches: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4'],
    components: { preview: true, opacity: true, hue: true, interaction: { input: true, save: true } }
});
pickr.on('save', (color) => {
    const hexColor = color.toHEXA().toString();
    cssEditor.insert(hexColor);
    pickr.hide();
});

// Local Storage Functions for Saving and Loading Content
function saveContentToLocalStorage() {
    localStorage.setItem("htmlContent", htmlEditor.getValue());
    localStorage.setItem("cssContent", cssEditor.getValue());
    localStorage.setItem("jsContent", jsEditor.getValue());
}
function loadContentFromLocalStorage() {
    const savedHtml = localStorage.getItem("htmlContent");
    const savedCss = localStorage.getItem("cssContent");
    const savedJs = localStorage.getItem("jsContent");

    if (savedHtml) htmlEditor.setValue(savedHtml, -1);
    if (savedCss) cssEditor.setValue(savedCss, -1);
    if (savedJs) jsEditor.setValue(savedJs, -1);
}
window.addEventListener("load", loadContentFromLocalStorage);

// Tab Switching
const tabButtons = document.querySelectorAll(".tab-button");
const codeEditors = document.querySelectorAll(".code-editor");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        codeEditors.forEach(editor => editor.classList.remove("active"));

        button.classList.add("active");
        document.getElementById(button.getAttribute("data-tab") + "-editor").classList.add("active");
    });
});

// Pop-out Preview in New Window
document.getElementById("popoutBtn").addEventListener("click", () => {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = `<script>${jsEditor.getValue()}</script>`;
    const fullContent = `
        <html>
        <head><meta charset="UTF-8"><title>Live Preview</title></head>
        <body>${htmlContent}${cssContent}${jsContent}</body>
        </html>
    `;
    const previewBlob = new Blob([fullContent], { type: 'text/html' });
    const previewUrl = URL.createObjectURL(previewBlob);
    const popoutWindow = window.open(previewUrl, '_blank');
    if (!popoutWindow) alert("Please allow pop-ups to open the preview.");
});

// Bind Beautify Button
document.getElementById("beautify-button").addEventListener("click", beautifyCode);
htmlEditor.session.on('change', updatePreview);
cssEditor.session.on('change', updatePreview);
jsEditor.session.on('change', updatePreview);
