const apiBaseURL = "http://159.89.83.234/LAMPAPI";

let curFlashcardIdx = 0;

let flashcards;

let toggle = 0;
let toggleHint = 0;

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

async function openaiApiHandler(query = '') {
    const searchBody = {
        pdfText: query
    };

    flashcards = await apiRequest('/promptSend.php', 'POST', searchBody);

    if(flashcards){
         displayFlashcards(flashcards);
    }
}

function displayFlashcards(flashcards) {
    document.querySelector("#flashcard-text").innerHTML = flashcards[curFlashcardIdx].question;
    document.querySelector("#flashcard-hint").innerHTML = "Hint...";
    document.querySelector('.loader-container').style.display = 'none';
    document.querySelector('.flash-container').style.display = 'flex';
}

document.querySelector("#forward-arrow").addEventListener("click", () => {
    if(curFlashcardIdx < flashcards.length - 1) {
        revealHint();
        toggle = 0;
        curFlashcardIdx += 1;
        displayFlashcards(flashcards);
    }
});

document.querySelector("#back-arrow").addEventListener("click", () => {
    if(curFlashcardIdx > 0) {
        revealHint();
        toggle = 0;
        curFlashcardIdx -= 1;
        displayFlashcards(flashcards);
    }
});

function revealHint(){
    document.querySelector("#flashcard-hint").classList.remove("hidden");
    document.querySelector("#flashcard-hint").innerHTML = "Hint...";
    toggleHint = 0;
}

document.querySelector("#refresh").addEventListener("click", () => {
    if(toggle === 0) {
        toggle++;
        document.querySelector("#flashcard-text").innerHTML = flashcards[curFlashcardIdx].answer;
        document.querySelector("#flashcard-hint").classList.add("hidden");
    }
    else {
        toggle--;
        document.querySelector("#flashcard-text").innerHTML = flashcards[curFlashcardIdx].question;
        document.querySelector("#flashcard-hint").classList.remove("hidden");
    }
});

document.querySelector("#flashcard-hint").addEventListener("click", () => {
    if(toggleHint === 0) {
        toggleHint++
        document.querySelector("#flashcard-hint").innerHTML = flashcards[curFlashcardIdx].hint;
    }
    else {
        toggleHint--;
        document.querySelector("#flashcard-hint").innerHTML = "Hint...";
    }
});

// Load stored text on page load
async function loadStoredText() {
    const storedText = localStorage.getItem("pdfText");  // Get the stored text from local storage
    console.log(storedText);
    if (storedText) {
        console.log("Parsed PDF: " + storedText)
        await openaiApiHandler(storedText);
    }
}

// Initialize on page load
loadStoredText();
