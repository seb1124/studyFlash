<?php


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

   // Remove all occurrences of ''' characters
   $cleaned_response = str_replace("```", "", $response);
   $cleaned_response = str_replace("json", "", $cleaned_response);


   // Decode the JSON response
   return json_decode($cleaned_response, true);
}


function sendResultInfoAsJson( $obj ) {
      header('Content-type: application/json');
      echo $obj;
}


$apiKey = "PLACEHOLDER";


$inData = getRequestInfo();


$input = $inData->pdfText;


// Define the messages
$messages = [
   ["role" => "system", "content" => "You are a helpful tutor. Generate flashcards based on the information provided."],
   ["role" => "user", "content" => "CREATE THE MAXIMUM AMOUNT OF FLASHCARDS YOU CAN in ONLY RAW JSON (without additional text and do NOT include ```json) with question, answer, (question and answer MUST be a maximum of 30 words long!!!) and hint values as objects in an array based on this information: ". $input],
];


// Call the OpenAI API
$completion = callOpenAI($apiKey, 'gpt-3.5-turbo', $messages);


if ($completion && isset($completion['choices'][0]['message']['content']))
{
   sendResultInfoAsJson($completion['choices'][0]['message']['content']);
} else
{
   $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
   //echo $http_status;
   echo "API Error: " . $completion['error']['message'] . "\n";
   //echo "Error in response from OpenAI API.\n";
}
?>

