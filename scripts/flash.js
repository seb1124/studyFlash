const apiBaseURL = "http://159.89.83.234/LAMPAPI";

let curFlashcardIdx = 0;

async function apiRequest(endpoint, method, body) {
    const response = await fetch(`${apiBaseURL}${endpoint}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function opneaiApiHandler(query = '') {
    const searchBody = {
        pdfText: query
    };

    const data = await apiRequest('/promptSend.php', 'POST', searchBody);

     if(data){
         localStorage.setItem("data", data);
         displayFlashcards(data)
     }
}

function displayFlashcards(flashcards) {
    document.querySelector("#flashcard-text").innerHTML = flashcards[curFlashcardIdx].question;
    document.querySelector("#flashcard-hint").innerHTML = flashcards[curFlashcardIdx].hint;
}

document.querySelector("#forward-arrow").addEventListener("click", () => {
    const data = localStorage.getItem("data");
    if(curFlashcardIdx + 1 < data.length){
        curFlashcardIdx += 1;
        displayFlashcards(data);
    }
});

opneaiApiHandler("this is sami he has green hair and red eyebrows");