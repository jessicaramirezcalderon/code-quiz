const questionSet = [{
    question: 'Which of these is a CSS class?',
    answers: [
        '.Red',
        '#Red',
        '*Red',
        '$Red',
    ],
    answerIndex: 0
},

{
    question: 'What does function return do?',
    answers: [
        'Returns function to zero',
        'Ends function execution',
        'Returns a string',
        'All of the above',
    ],
    answerIndex: 1
},

{
    question: 'What is the index limit of an array?',
    answers: [
        '10',
        '5',
        'No limit',
        'All of the above',
    ],
    answerIndex: 2
},

{
    question: 'What is CSS?',
    answers: [
        'An HTML tag',
        'A Javascript method',
        'A styling language',
        'All of the above',
    ],
    answerIndex: 2
},

{
    question: 'What is a typical use of the console.log function?',
    answers: [
        'Alerts',
        'Check the DOM',
        'Debugging',
        'Returning another function',
    ],
    answerIndex: 2
},

{
    question: 'Which of these is a markup language?',
    answers: [
        'HTML',
        'CSS',
        'NODE',
        'JAVA',
    ],
    answerIndex: 0
},

{
    question: 'Which of these is a CSS library?',
    answers: [
        'Pure',
        'Materialize',
        'Bootstrap',
        'All of the above',
    ],
    answerIndex: 3
},

{
    question: 'What attribute does the script tag use for linking?',
    answers: [
        'HREF',
        'SRC',
        'TYPE',
        'TARGET',
    ],
    answerIndex: 1
},

{
    question: 'What tag do you need to gather user input?',
    answers: [
        'Input',
        'Form',
        'Span',
        'Script',
    ],
    answerIndex: 0
},

{
    question: 'What is an example of an API?',
    answers: [
        'DOM',
        'Touch Events',
        'Canvas',
        'All of the above',
    ],
    answerIndex: 3
}]

//save the correct answer index 
let correctAnswer = questionSet[0].answerIndex;

//Save current index 
let currentIndex = 0;

//console.log('correct answer is' + correctAnswer);

//start timer on Start click
document.getElementById("start").addEventListener("click", function () {
    $('#q-set').show();
    startTimer();

});

document.getElementById("restart").addEventListener("click", function () {
    currentIndex = 0;
    $('#q-set').hide();
    $('#quiz-container').show();
    $('#restart').hide();
    secondsDisplay.textContent = '180 Seconds';

});

//Answers click event handler
document.getElementById("answer-list").addEventListener("click", function (event) {
    const userAnswerIndex = parseInt(event.target.getAttribute('id').substring(6, 7));

    if (questionSet.length - 1 === currentIndex) {
        $('#quiz-container').hide();
        $('#results').show();
        resetTimer();
        return;
    }

    else if (userAnswerIndex === questionSet[currentIndex].answerIndex) {
        questionSet[currentIndex].gotIt = true;
        alert('Correct');
    }

    else {
        questionSet[currentIndex].gotIt = false;
        secondsElapsed = secondsElapsed + 20;
        alert('Wrong');
    }

    //Calling on user input/ Timer restarts 
    currentIndex++;
    getQuestion(currentIndex);
    getAnswers(currentIndex);


});

document.getElementById("submit-init").addEventListener("click", function () {
    const userInit = document.getElementById("initials-input").value;
    localStorage.setItem("Initials", userInit);

    if (!userInit) {
        alert('You need to enter your initials to get your results')
    }

    else {
        const totalCorrect = questionSet.filter((question) => question.gotIt).length;
        const score = (totalCorrect / questionSet.length) * 100;
        document.getElementById("final-score").textContent = "Hey " + localStorage.getItem("Initials") + ", you got a " + score + "!";

        $('#results').hide();
        $('#restart').show();
    }
});

//Insert answers to each list item
function getAnswers(index) {
    for (let i = 0; i < questionSet[index].answers.length; i++) {
        const answerEl = document.getElementById('answer' + i);

        answerEl.textContent = questionSet[index].answers[i];
    }
}

//Set answers to current index
getAnswers(currentIndex);

//Insert question into page
function getQuestion(index) {
    const questionEl = document.querySelector('#question');
    questionEl.textContent = questionSet[index].question; //get question
}

//Set questions to current index
getQuestion(currentIndex);

/////////////////////////////////////// Results //////////////////////////////////////////


/////////////////////////////////////// Timer //////////////////////////////////////////

const secondsDisplay = document.querySelector("#seconds");
let interval;

// Start timer function
function startTimer() {
    const totalSeconds = 180;

    // use resetTimer to reset
    resetTimer();

    // begin timer
    interval = setInterval(function () {
        const timeLeft = (totalSeconds - secondsElapsed);

        secondsDisplay.textContent = timeLeft + ' Seconds';

        if (timeLeft === 0) {
            resetTimer();
            alert('You ran out of time. You need to click Start to begin again');

        }

        secondsElapsed++;
        // have intervals at every 1000 milliseconds
    }, 1000);
}


function getMinutesFromSeconds(seconds) {
    return Math.floor(seconds / 60);

}
function getRemainderFromSeconds(seconds) {
    if (seconds % 60 < 10) {
        return "0" + seconds % 60;
    }
    return seconds % 60;
}

// reset the Timer
function resetTimer() {
    // clear any existing intervals.
    clearInterval(interval);
    secondsElapsed = 0;
}

//playButton.addEventListener("click", startTimer);



