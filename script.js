// Initialize Ace editor for HTML
const htmlEditor = ace.edit("html-editor");
htmlEditor.setTheme("ace/theme/dracula");
htmlEditor.session.setMode("ace/mode/html");
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
jsEditor.setOptions({
    fontSize: "14px",
    showPrintMargin: false,
    wrap: true,
    showLineNumbers: true,
    tabSize: 2
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

// Listen for changes in the editors to update preview dynamically
htmlEditor.session.on('change', updatePreview);
cssEditor.session.on('change', updatePreview);
jsEditor.session.on('change', updatePreview);

// Tab switching logic
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

// Add download functionality
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
    const zip = new JSZip();
    zip.file("index.html", htmlEditor.getValue());
    zip.file("styles.css", cssEditor.getValue());
    zip.file("script.js", jsEditor.getValue());

    zip.generateAsync({ type: "blob" }).then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "project.zip";
        link.click();
    });
});

// Add upload functionality
const uploadBtn = document.getElementById("uploadBtn");
uploadBtn.addEventListener("change", async (event) => {
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
        reader.onload = (e) => {
            const content = e.target.result;
            if (file.name.endsWith(".html")) htmlEditor.setValue(content, -1);
            if (file.name.endsWith(".css")) cssEditor.setValue(content, -1);
            if (file.name.endsWith(".js")) jsEditor.setValue(content, -1);
        };
        reader.readAsText(file);
    }
});

// Popout Preview functionality
const popoutBtn = document.getElementById("popoutBtn");
popoutBtn.addEventListener("click", () => {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = `<script>${jsEditor.getValue()}</script>`;

    const fullContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        ${cssContent}
    </head>
    <body>
        ${htmlContent}
        <script>
            ${jsEditor.getValue()}
        <\/script>
    </body>
    </html>
    `;

    const previewBlob = new Blob([fullContent], { type: 'text/html' });
    const previewUrl = URL.createObjectURL(previewBlob);

    const previewWindow = window.open(previewUrl, '_blank');
    if (!previewWindow) {
        alert("Please enable pop-ups in your browser settings to view the preview.");
    } else {
        previewWindow.onload = () => URL.revokeObjectURL(previewUrl);
    }
});

// Resize preview functionality
const resizeHandle = document.getElementById("resizeHandle");
resizeHandle.addEventListener("mousedown", (e) => {
    document.addEventListener("mousemove", resizePreview);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", resizePreview);
    });
});

function resizePreview(e) {
    const newEditorWidth = e.clientX;
    document.querySelector(".editor-container").style.width = `${newEditorWidth}px`;
    document.querySelector(".preview-container").style.width = `calc(100% - ${newEditorWidth}px)`;
}
