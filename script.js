// Knowledge questions
let knowledgeQuestions = [
    {
        question: "Wer hat HTML erfunden?",
        option_1: "Robbie Williams",
        option_2: "Lady Gaga",
        option_3: "Tim Berners-Lee",
        option_4: "Justin Bieber",
        correct_option: 3,
    },
    {
        question: "Welcher Planet in unserem Sonnensystem hat die meisten Monde?",
        option_1: "Jupiter",
        option_2: "Saturn",
        option_3: "Uranus",
        option_4: "Mars",
        correct_option: 2,
    },
    {
        question: "Wie viele Knochen hat ein erwachsener Mensch?",
        option_1: "106",
        option_2: "206",
        option_3: "306",
        option_4: "406",
        correct_option: 2,
    },
    {
        question: "Welches Metall leitet Wärme und Elektrizität am besten?",
        option_1: "Gold",
        option_2: "Kupfer",
        option_3: "Aluminium",
        option_4: "Silber",
        correct_option: 4,
    },
    {
        question: "Wie viele Zähne hat ein erwachsener Mensch normalerweise?",
        option_1: "22",
        option_2: "28",
        option_3: "32",
        option_4: "36",
        correct_option: 3,
    },
];

// Audio elements
let AUDIO_CORRECT = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/failure.mp3');

// Game variables
let correctAnswers = 0;
let currentQuestionIndex = 0;
let answerSelected = false;

// Initialize the quiz
function initQuiz() {
    document.getElementById('question-counter').innerHTML = `1 von ${knowledgeQuestions.length} Fragen`;
    showQuestion();
}

// Display the current question
function showQuestion() {
    if (currentQuestionIndex >= knowledgeQuestions.length) {
        showResults();
        return;
    }
    
    let question = knowledgeQuestions[currentQuestionIndex];
    
    document.getElementById('question-text').innerHTML = question.question;
    
    document.getElementById('answer-options').innerHTML = `
        <div class="answer-option" onclick="selectAnswer(1)">
            ${question.option_1}
        </div>
        <div class="answer-option" onclick="selectAnswer(2)">
            ${question.option_2}
        </div>
        <div class="answer-option" onclick="selectAnswer(3)">
            ${question.option_3}
        </div>
        <div class="answer-option" onclick="selectAnswer(4)">
            ${question.option_4}
        </div>
    `;
    
    document.getElementById('next-btn').disabled = true;
    
    // Update progress bar
    let percent = ((currentQuestionIndex + 1) / knowledgeQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('progress-bar').innerHTML = Math.round(percent) + '%';
    
    answerSelected = false;
}

// Select an answer
function selectAnswer(selectedOption) {
    if (answerSelected) {
        return;
    }
    
    answerSelected = true;
    document.getElementById('next-btn').disabled = false;
    
    let question = knowledgeQuestions[currentQuestionIndex];
    let correctOption = question.correct_option;
    
    // Get all answer options
    let options = document.getElementsByClassName('answer-option');
    
    // Mark correct and wrong answers
    if (selectedOption === correctOption) {
        options[selectedOption-1].classList.add('correct-answer');
        try {
            AUDIO_CORRECT.play();
        } catch(e) {
            console.log("Audio could not be played:", e);
        }
        correctAnswers++;
    } else {
        options[selectedOption-1].classList.add('wrong-answer');
        options[correctOption-1].classList.add('correct-answer');
        try {
            AUDIO_WRONG.play();
        } catch(e) {
            console.log("Audio could not be played:", e);
        }
    }
}

// Check response and go to next question
function checkResponse() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < knowledgeQuestions.length) {
        document.getElementById('question-counter').innerHTML = `${currentQuestionIndex + 1} von ${knowledgeQuestions.length} Fragen`;
        showQuestion();
    } else {
        // Set progress bar to 100% on the last question
        document.getElementById('progress-bar').style.width = '100%';
        document.getElementById('progress-bar').innerHTML = '100%';
        showResults();
    }
}

// Show results
function showResults() {
    document.getElementById('quiz-container').innerHTML = `
        <div class="image-container">
            <img src="img/abc.jpg" alt="Quiz buttons" class="quiz-image">
        </div>
        <div class="progress-section">
            <div class="progress-bar" style="width: 100%;">100%</div>
        </div>
        <div class="end-screen" id="end-screen">
            <img src="img/trophy.png" alt="Trophy" class="trophy-image">
            <div class="result-heading">Quiz finished!</div>
            <div class="result-summary">You answered <b>${correctAnswers}</b> out of <b>${knowledgeQuestions.length}</b> questions correctly.</div>
            <div class="button-area">
                <button onclick="restartQuiz()" class="btn btn-primary">Play again</button>
            </div>
        </div>
    `;
}

// Restart the quiz
function restartQuiz() {
    correctAnswers = 0;
    currentQuestionIndex = 0;
    
    document.getElementById('quiz-container').innerHTML = `
        <div class="image-container">
            <img src="img/abc.jpg" alt="Quiz buttons" class="quiz-image">
        </div>
        <div class="progress-section">
            <div class="progress-bar" id="progress-bar" style="width: 20%;">20%</div>
        </div>
        <div class="question-element">
            <div class="question-header">
                <h5 id="question-text">Question</h5>
            </div>
            <div class="answer-body" id="answer-options">
                <!-- Answer options will be inserted via JavaScript -->
            </div>
            <div class="question-footer">
                <span id="question-counter">1 von 5 Fragen</span>
                <button onclick="checkResponse()" class="btn btn-primary" id="next-btn">Next question</button>
            </div>
        </div>
    `;
    
    initQuiz();
}

// Start the quiz
document.addEventListener('DOMContentLoaded', initQuiz);

// Window resize adjustment
window.addEventListener('resize', function() {
    // Additional adjustments can be made here if needed
});
