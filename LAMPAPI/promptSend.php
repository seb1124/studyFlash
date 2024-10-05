<?php

class Flashcard {
    public string $question;
    public string $answer;

    public function __construct(string $question, string $answer) {
        $this->question = $question;
        $this->answer = $answer;
    }
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

// Your OpenAI API key
$apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key

// Define the messages
$messages = [
    ["role" => "system", "content" => "You are a helpful tutor. Generate flashcards based on the information provided."],
    ["role" => "user", "content" => "Create flashcards based on this information: Putin worked as a KGB foreign intelligence officer for 16 years, rising to the rank of lieutenant colonel before resigning in 1991 to begin a political career in Saint Petersburg. In 1996, he moved to Moscow to join the administration of President Boris Yeltsin. He briefly served as the director of the Federal Security Service (FSB) and then as secretary of the Security Council of Russia before being appointed prime minister in August 1999. Following Yeltsin's resignation, Putin became acting president and, in less than four months, was elected to his first term as president. He was reelected in 2004. Due to constitutional limitations of two consecutive presidential terms, Putin served as prime minister again from 2008 to 2012 under Dmitry Medvedev. He returned to the presidency in 2012, following an election marked by allegations of fraud and protests, and was reelected in 2018. Additionally, Putin led Russia in a conflict against Chechen separatists, oversaw a military conflict with Georgia, and ordered a military intervention in Syria to support his ally Bashar al-Assad during the Syrian civil war."],
];

// Call the OpenAI API
$completion = callOpenAI($apiKey, 'gpt-4o-2024-08-06', $messages);

// Extract the flashcards if the response is valid
if ($completion && isset($completion['choices'][0]['message']['content'])) {
    $flashcardsData = json_decode($completion['choices'][0]['message']['content'], true);
    
    // Create flashcards from the response
    $flashcards = [];
    foreach ($flashcardsData as $flashcardItem) {
        $flashcards[] = new Flashcard($flashcardItem['question'], $flashcardItem['answer']);
    }

    // Display the flashcards
    foreach ($flashcards as $flashcard) {
        echo "Question: " . $flashcard->question . "\n";
        echo "Answer: " . $flashcard->answer . "\n\n";
    }
} else {
    echo "Error in response from OpenAI API.\n";
}

?>
