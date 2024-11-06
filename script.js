// Get the editor elements
const htmlEditor = CodeMirror(document.getElementById('html-editor'), {
    mode: 'htmlmixed',
    theme: 'dracula', // Change this to another theme if desired
    lineNumbers: true,
    autoCloseTags: true,
    tabSize: 2,
    indentUnit: 2,
    lineWrapping: true,
    extraKeys: { "Ctrl-Space": "autocomplete" } // Optional: enables autocomplete on Ctrl+Space
});
const cssEditor = CodeMirror(document.getElementById('css-editor'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    tabSize: 2,
    indentUnit: 2,
    lineWrapping: true,
    extraKeys: { "Ctrl-Space": "autocomplete" }
});
const jsEditor = CodeMirror(document.getElementById('js-editor'), {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    tabSize: 2,
    indentUnit: 2,
    lineWrapping: true,
    extraKeys: { "Ctrl-Space": "autocomplete" }
});

// Sample code snippets with neat formatting and proper line breaks
const samples = {
    sample1: {
        html: `
<div class="container">
    <h1>Hello World</h1>
    <p>This is a simple HTML sample.</p>
</div>
`,
        css: `
h1 {
    color: blue;
}
`,
        js: `
console.log('Hello from JS!');
`
    },
    sample2: {
        html: `
<div>
    <h2>Interactive Page</h2>
    <button onclick="changeColor()">Change Color</button>
</div>
`,
        css: `
button {
    padding: 10px;
    background-color: red;
    color: white;
}
`,
        js: `
function changeColor() {
    document.body.style.backgroundColor = 'lightblue';
}
`
    },
    sample3: {
        html: `
<div>
    <h2>Sample 3</h2>
    <p>Custom design with JS interaction</p>
</div>
`,
        css: `
p {
    color: green;
    font-size: 20px;
}
`,
        js: `
document.querySelector('h2').innerText = 'Updated with JS';
`
    }
};

// Load the selected sample
document.getElementById('sample-selector').addEventListener('change', (event) => {
    const sample = event.target.value;
    const code = samples[sample];

    // Alert user and load code into editors
    alert("Loading HTML code into the HTML editor...");
    htmlEditor.setValue(code.html.trim());
    
    alert("Loading CSS code into the CSS editor...");
    cssEditor.setValue(code.css.trim());
    
    alert("Loading JavaScript code into the JavaScript editor...");
    jsEditor.setValue(code.js.trim());
    
    // Update preview after code is loaded
    updatePreview();
});

// Function to update preview
function updatePreview() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = `<script>${jsEditor.getValue()}</script>`;
    const fullContent = htmlContent + cssContent + jsContent;

    const previewFrame = document.getElementById('preview');
    previewFrame.srcdoc = fullContent;
}

// Initial preview update
updatePreview();

// Tab switch functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const tab = event.target.dataset.tab;

        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        document.querySelectorAll('.code-editor').forEach(editor => editor.classList.remove('active'));
        document.getElementById(`${tab}-editor`).classList.add('active');
    });
});

// Resize functionality for preview pane
let isResizing = false;

document.querySelector('.resize-handle').addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        const newWidth = e.clientX;
        document.querySelector('.editor-container').style.width = `${newWidth}px`;
        document.querySelector('.preview-container').style.width = `calc(100% - ${newWidth}px)`;
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
});

// Popout button functionality
document.getElementById('popoutBtn').addEventListener('click', () => {
    // Open a new window with fullscreen size
    const newWindow = window.open('', '', 'width=' + screen.width + ',height=' + screen.height + ',top=0,left=0,scrollbars=no,status=no,toolbar=no,location=no,menubar=no');

    // Write the preview iframe content to the new window
    const previewFrame = document.getElementById('preview');
    newWindow.document.write('<html><head><title>Live Preview</title></head><body style="margin:0; padding:0; overflow:hidden;">' + previewFrame.outerHTML + '</body></html>');
    newWindow.document.close();

    // Optional: Add CSS to make the iframe fill the new window
    newWindow.onload = () => {
        const iframe = newWindow.document.querySelector('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
    };
});
