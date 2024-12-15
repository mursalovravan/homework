// script.js

// Define the quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "London", "Paris", "Madrid"],
        correct: 2, // Paris
        money: 100
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1, // Mars
        money: 200
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
        correct: 1, // William Shakespeare
        money: 300
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3, // Pacific Ocean
        money: 400
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: ["Au", "Ag", "Gd", "Go"],
        correct: 0, // Au
        money: 500
    }
];

// Initialize game variables
let currentQuestion = 0;
let balance = 0;

// Select DOM elements
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const balanceElement = document.getElementById('balance');
const resultContainer = document.getElementById('result-container');
const finalBalanceElement = document.getElementById('final-balance');
const restartButton = document.getElementById('restart-btn');

// Function to start the game
function startGame() {
    currentQuestion = 0;
    balance = 0;
    balanceElement.textContent = `Balance: $${balance}`;
    resultContainer.classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    loadQuestion();
}

// Function to load a question
function loadQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        questionElement.textContent = q.question;
        answerButtons.forEach((button, index) => {
            button.textContent = q.answers[index];
            button.disabled = false;
            button.style.backgroundColor = '#333'; // Reset button color
        });
    } else {
        endGame();
    }
}

// Function to handle answer selection
function selectAnswer(event) {
    const selectedButton = event.target;
    const selectedIndex = parseInt(selectedButton.getAttribute('data-index'));
    const currentQ = questions[currentQuestion];
    
    // Disable all buttons to prevent multiple selections
    answerButtons.forEach(button => button.disabled = true);
    
    if (selectedIndex === currentQ.correct) {
        // Correct answer
        balance += currentQ.money;
        balanceElement.textContent = `Balance: $${balance}`;
        selectedButton.style.backgroundColor = 'green';
    } else {
        // Wrong answer
        balance -= currentQ.money;
        balanceElement.textContent = `Balance: $${balance}`;
        selectedButton.style.backgroundColor = 'red';
        // Highlight the correct answer
        answerButtons[currentQ.correct].style.backgroundColor = 'green';
    }
    
    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1000);
}

// Function to end the game
function endGame() {
    document.getElementById('question-container').classList.add('hidden');
    finalBalanceElement.textContent = balance;
    resultContainer.classList.remove('hidden');
}

// Event listeners for answer buttons
answerButtons.forEach(button => {
    button.addEventListener('click', selectAnswer);
});

// Event listener for restart button
restartButton.addEventListener('click', startGame);

// Start the game when the page loads
startGame();
