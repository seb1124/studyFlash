## Inspiration
We hated creating the perfect study material for ourselves; creating the "perfect" study set took so long. So, we thought about how to make it perfect within seconds, and then it hit us: AI.

## What it does
The user can upload a PDF that they want to make flashcards out of. Our web app will parse the document and generate flashcards. Our flashcards also offer hints; the result is an efficient way to study with flashcards without taking the time to write them by hand.

## How we built it
We utilized a Ubuntu server running Apache to host our project. We created the front end using HTML/CSS and JavaScript. We parsed the PDF files into strings using the pdf.js library and then used them to make calls to OpenAI API. We used the incoming JSON to make stylized cards for the user to study. 

## Challenges we ran into
One of the challenges we ran into was connecting PHP to the OpenAI API, as there was no documentation. Another significant issue was getting the PHP to send a proper format request to the API to return consistent information.

## Accomplishments that we're proud of
Our biggest accomplishment was finishing the project and finding solutions to get the prompting to work with PHP.

## What we learned
We learned how to use PHP to connect with OpenAI API and create better UI/UX for a more engaging experience for users.

## What's next for StudyFlash
Our future goal for the project is to allow users to log in to save their flashcards and quizzes, which will be incorporated in the near future. We want to continue to develop this project and allow students & teachers to use this product to help themselves and others, and to allow them to spend more time doing other things that they enjoy!


## Our team
* Alexander (Front-end)
* Will (Front-end)
* Hector (Back-end)
* Sami (Back-end)


**This project was built for KnightHacks @ UCF 2024**
