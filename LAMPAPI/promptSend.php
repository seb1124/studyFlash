<?php

class Flashcard {
    public string $question;
    public string $answer;

    public function __construct(string $question, string $answer) {
        $this->question = $question;
        $this->answer = $answer;
    }
}

$apiKey = "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";

$inData = getRequestInfo();

$input = $inData->pdfText;

function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), false);
}

// Function to call OpenAI API
function callOpenAI($apiKey, $model, $messages) {
    $url = 'https://api.openai.com/v1/chat/completions';

    // Set up the headers
    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ];

    // Prepare the request data
    $data = [
        'model' => $model,
        'messages' => $messages,
    ];

    // Initialize cURL
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    // Execute the request
    $response = curl_exec($ch);

    // Check for errors
    if (curl_errno($ch)) {
        echo 'Error: ' . curl_error($ch);
        return null;
    }

    // Close cURL
    curl_close($ch);

    // Decode the JSON response
    return json_decode($response, true);
}

// Define the messages
$messages = [
    ["role" => "system", "content" => "You are a helpful tutor. Generate flashcards based on the information provided."],
    ["role" => "user", "content" => "Create flashcards based on this information: ". $input],
];

// Call the OpenAI API
$completion = callOpenAI($apiKey, 'gpt-3.5-turbo', $messages);


// Extract the flashcards if the response is valid
if ($completion && isset($completion['choices'][0]['message']['content'])) {
    echo $completion['choices'][0]['message']['content'];
} else {
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    echo $http_status;
    echo "API Error: " . $completion['error']['message'] . "\n";
    echo "Error in response from OpenAI API.\n";
}

?>
