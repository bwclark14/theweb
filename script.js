// Set the default sample code to load on page load (Sample 1)
window.addEventListener('DOMContentLoaded', () => {
    const defaultSample = 'sample1';
    const code = samples[defaultSample];

    htmlEditor.setValue(code.html.trim());
    cssEditor.setValue(code.css.trim());
    jsEditor.setValue(code.js.trim());

    updatePreview();  // Update the preview after loading code
});

// Initialize CodeMirror editor for HTML with syntax highlighting
const htmlEditor = CodeMirror(document.getElementById('html-editor'), {
    mode: 'html', // HTML mixed mode for combined HTML, CSS, and JS
    theme: 'dracula',  // You can use any theme (e.g., 'dracula', 'monokai')
    lineNumbers: true,
    autoCloseTags: true,  // Automatically closes HTML tags
    tabSize: 2,
    indentUnit: 2,
    lineWrapping: true,  // Wrap lines if they are too long
    extraKeys: { "Ctrl-Space": "autocomplete" }
});

// Initialize CodeMirror editor for CSS
const cssEditor = CodeMirror(document.getElementById('css-editor'), {
    mode: 'css',  // CSS mode for CSS syntax
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    tabSize: 2,
    indentUnit: 2,
    lineWrapping: true,
    extraKeys: { "Ctrl-Space": "autocomplete" }
});

// Initialize CodeMirror editor for JavaScript
const jsEditor = CodeMirror(document.getElementById('js-editor'), {
    mode: 'javascript',  // JavaScript mode for JS syntax
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
    htmlEditor.setValue(code.html.trim());  // Load HTML code into the editor
    
    alert("Loading CSS code into the CSS editor...");
    cssEditor.setValue(code.css.trim());  // Load CSS code into the editor
    
    alert("Loading JavaScript code into the JavaScript editor...");
    jsEditor.setValue(code.js.trim());  // Load JS code into the editor
    
    // Update the preview after loading the code
    updatePreview();
});

// Function to update preview
function updatePreview() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = `<script>${jsEditor.getValue()}</script>`;
    const fullContent = htmlContent + cssContent + jsContent;

    const previewFrame = document.getElementById('preview');
    previewFrame.srcdoc = fullContent; // Inject the code into the iframe
}

// Initial preview update
updatePreview();

// Listen for changes in the editors to update preview dynamically
htmlEditor.on('change', updatePreview);
cssEditor.on('change', updatePreview);
jsEditor.on('change', updatePreview);

// Tab switching functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const tab = event.target.dataset.tab;

        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Show the corresponding editor
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
    const newWindow = window.open('', '', 'width=' + screen.width + ',height=' + screen.height + ',top=0,left=0,scrollbars=no,status=no,toolbar=no');

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
