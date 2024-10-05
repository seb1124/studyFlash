<?php
//Parse a pdf into a string

// Include the Composer autoloader
require 'vendor/autoload.php';

use Smalot\PdfParser\Parser;

// Set the content type to JSON
header('Content-Type: application/json');

// Check if a file is uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdf'])) {
    $pdfFile = $_FILES['pdf'];

    // Check for upload errors
    if ($pdfFile['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['error' => 'File upload error: ' . $pdfFile['error']]);
        exit;
    }

    // Ensure the uploaded file is a PDF
    $fileType = mime_content_type($pdfFile['tmp_name']);
    if ($fileType !== 'application/pdf') {
        echo json_encode(['error' => 'Uploaded file is not a valid PDF.']);
        exit;
    }

    // Parse the PDF
    $parser = new Parser();
    $pdf = $parser->parseFile($pdfFile['tmp_name']);
    $text = $pdf->getText();

    // Return the extracted text
    echo json_encode(['text' => $text]);
} else {
    echo json_encode(['error' => 'No PDF file uploaded.']);
}
?>
