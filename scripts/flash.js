const apiBaseURL = "http://159.89.83.234/LAMPAPI";

let curFlashcardIdx = 0;

let flashcards;

let toggle = 0;

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

    flashcards = await apiRequest('/promptSend.php', 'POST', searchBody);

    if(flashcards){
         displayFlashcards(flashcards);
    }
}

function displayFlashcards(flashcards) {
    document.querySelector("#flashcard-text").innerHTML = flashcards[curFlashcardIdx].question;
    document.querySelector("#flashcard-hint").innerHTML = flashcards[curFlashcardIdx].hint;
}

document.querySelector("#forward-arrow").addEventListener("click", () => {
    if(curFlashcardIdx < flashcards.length - 1) {
        toggle = 0;
        curFlashcardIdx += 1;
        displayFlashcards(flashcards);
    }
});

document.querySelector("#back-arrow").addEventListener("click", () => {
    if(curFlashcardIdx > 0) {
        toggle = 0;
        curFlashcardIdx -= 1;
        displayFlashcards(flashcards);
    }
});

document.querySelector("#refresh").addEventListener("click", () => {
    if(toggle === 0) {
        toggle++;
        document.querySelector("#flashcard-text").innerHTML = flashcards[curFlashcardIdx].answer;
    }
    else {
        toggle--;
        document.querySelector("#flashcard-text").innerHTML = flashcards[curFlashcardIdx].question;
    }
});

opneaiApiHandler("Putin worked as a KGB foreign intelligence officer for 16 years, rising to the rank of lieutenant colonel before resigning in 1991 to begin a political career in Saint Petersburg. In 1996, he moved to Moscow to join the administration of President Boris Yeltsin. He briefly served as the director of the Federal Security Service (FSB) and then as secretary of the Security Council of Russia before being appointed prime minister in August 1999. Following Yeltsin's resignation, Putin became acting president and, in less than four months, was elected to his first term as president. He was reelected in 2004. Due to constitutional limitations of two consecutive presidential terms, Putin served as prime minister again from 2008 to 2012 under Dmitry Medvedev. He returned to the presidency in 2012, following an election marked by allegations of fraud and protests, and was reelected in 2018.");
// Load stored text on page load
async function loadStoredText() {
    const storedText = localStorage.getItem("pdfText");  // Get the stored text from local storage
    if (storedText) {
        console.log("Parsed PDF: " + storedText)
        await opneaiApiHandler(storedText);
    }
}

