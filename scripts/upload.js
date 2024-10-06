// Function to read and parse the PDF file
async function readPdf(file) {

    localStorage.clear();

    const fileReader = new FileReader();

    fileReader.onload = async function() {
        const typedarray = new Uint8Array(this.result);

        // Load PDF document
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const numPages = pdf.numPages;
        let fullText = '';

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }

        localStorage.setItem("pdfText", fullText);
    };

    fileReader.readAsArrayBuffer(file);
}

// Function to initialize event listeners
function initializeListeners() {
    document.getElementById('pdf-upload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            localStorage.setItem('pdfData', JSON.stringify(file));
            readPdf(file);
            window.location.href = 'flash.html';
        } else {
            alert("Please upload a valid PDF file.");
        }
    });
}

// Load stored text on page load
function loadStoredText() {
    const storedText = localStorage.getItem("pdfText");  // Get the stored text from local storage
    if (storedText) {
        console.log("Parsed PDF: " + storedText);
    }
    else{
        console.log("Storage failed");
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeListeners();
    loadStoredText();
});
