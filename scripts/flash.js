const apiBaseURL = "http://159.89.83.234/LAMPAPI";

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

async function talkToGpt(query = '') {
    const searchBody = {
        pdfText: query
    };

    const data = await apiRequest('/promptSend.php', 'POST', searchBody);

     if(data){
         displayFlashcards(data)
     }
}

function displayFlashcards(flashcards) {
    const insert = document.getElementById('api-test');
    insert.innerHTML = '';  // Clear the existing list


    flashcards.forEach((flashcard) => {

        const row = document.createElement('tr');
        row.innerHTML = `
           <td>${flashcard.question}</td>
           <td>${flashcard.answer}</td>
       `;
        insert.appendChild(row);
    });


}

talkToGpt("Trump was born on June 14, 1946, at Jamaica Hospital in Queens, New York City,[1] the fourth child of Fred Trump and Mary Anne MacLeod Trump. He grew up with older siblings Maryanne, Fred Jr., and Elizabeth and younger brother Robert in the Jamaica Estates neighborhood of Queens, and attended the private Kew-Forest School from kindergarten through seventh grade.[2][3][4] At age 13, he entered the New York Military Academy, a private boarding school.[5] In 1964, he enrolled at Fordham University. Two years later, he transferred to the Wharton School of the University of Pennsylvania, graduating in May 1968 with a Bachelor of Science in economics.[6][7] In 2015, Trump's lawyer threatened Trump's col" +
    "leges, his high school, and the College Board with legal action if they released his academic records.[8]");


