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
  { text: "The first computer virus was created in 1982.", image: "https://tse4.mm.bing.net/th/id/OIP.A841fIv6sL9hMwLaLGuQDAHaDt?w=310&h=175&c=7&r=0&o=5&dpr=1.4&pid=1.7" },
  { text: "The number of emails sent and received per day in 2024 is 361.6 billion.", image: "https://cdn.shopify.com/s/files/1/0840/8370/3830/articles/1701784225-number-of-emails-sent-and-received-per-day-2023-2027.png?v=1714654437" },
  { text: "The internet was originally developed for military use.", image: "https://tse4.mm.bing.net/th/id/OIP.m5as9dHqt3CrZQGua_EZWgHaD2?w=318&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7" },
  { text: "The first computer game was called Spacewar! and was created in 1962.", image: "https://tse1.mm.bing.net/th/id/OIP.AZJ3rV7_IN1PUdAuPYUazAHaEK?w=1280&h=720&rs=1&pid=ImgDetMain" },
  { text: "The first programmable and digital computer, ENIAC (Electronic Numerical Integrator and Computer), was developed in 1945", image: "https://th.bing.com/th/id/R.39f00ad246b0328b29ae9ed6de30afcf?rik=BtVkVuZJj47oqw&pid=ImgRaw&r=0" }
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

// Ace Editor Configuration for JS
jsEditor.setOptions({
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

// Ace Editor Configuration for CSS
cssEditor.setOptions({
  fontSize: "14px",
  showPrintMargin: false,
  wrap: true,
  showLineNumbers: true,
  tabSize: 2
});

// Initialize Ace editor for HTML
const htmlEditor = ace.edit("html-editor");
htmlEditor.setTheme("ace/theme/dracula");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.setValue(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Random Fact Generator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1 id="fact-title">Random Fact</h1>
    <p id="fact-text"></p>
    <img id="fact-image" src="https://tinyurl.com/csfact101" alt="Fact Image">
    <button id="fact-button">Show Fact</button>
    <button id="reset-button">Reset</button>
  </div>
  <script src="script.js"></script>
</body>
</html>
`);

// Ace Editor Configuration for HTML
htmlEditor.setOptions({
  fontSize: "14px",
  showPrintMargin: false,
  wrap: true,
  showLineNumbers: true,
  tabSize: 2
});

// Function to update preview
function updatePreview() {
  const htmlContent = htmlEditor.getValue();
  const cssContent = \`<style>\${cssEditor.getValue()}</style>\`;
  const jsContent = \`<script>\${jsEditor.getValue()}</script>\`;
  const fullContent = htmlContent + cssContent + jsContent;

  const previewFrame = document.getElementById('preview');
  previewFrame.srcdoc = fullContent;
}

// Initial preview update
updatePreview();

// Listen for changes in the editors to update preview dynamically
htmlEditor.session.on('change', updatePreview);
cssEditor.session.on('change', updatePreview);
jsEditor.session.on('change', updatePreview);

// Tab Switching Logic
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

// Download Functionality
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
  const zip = new JSZip();
  zip.file("mysite.html", htmlEditor.getValue());
  zip.file("mysite.css", cssEditor.getValue());
  zip.file("mysite.js", jsEditor.getValue());

  zip.generateAsync({ type: "blob" }).then((content) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "mysite.zip";
    link.click();
  });
});

// File Upload Functionality
const uploadInput = document.getElementById("uploadInput");
uploadInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.name.endsWith(".zip")) {
    const zip = await JSZip.loadAsync(file);
    zip.forEach(async (relativePath, fileEntry) => {
      const content = await fileEntry.async("text");
      if (relativePath.endsWith(".html")) htmlEditor.setValue(content, -1);
      if (relativePath.endsWith(".css")) cssEditor.setValue(content, -1);
      if (relativePath.endsWith(".js")) jsEditor.setValue(content, -1);
    });
  } else {
    const reader = new FileReader();
    reader
