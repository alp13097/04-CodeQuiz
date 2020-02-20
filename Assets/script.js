const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const timer = document.getElementById("time")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove("hide")
    setNextQuestion()
    setTime()
}

var secondsLeft = 60;

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        scorePage();
      }
  
    }, 1000);
  }

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
    {
        question: "How many months are in this course?",
        answers: [
            { text: "4", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "9", correct: false }
        ]
    },
    {
        question: "What is the language we use to style a web page?",
        answers: [
            { text: "javascript", correct: false },
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Chinese", correct: false }
        ],
        question: "What is the main structure language of a web page?",
        answers: [
            { text: "CSS", correct: false },
            { text: "HTML", correct: true },
            { text: "javascript", correct: false },
            {text: "jQuery", correct: false }
        ]
    },
    {
        question: "What is the correct document decleration for an HTML file?",
        answers: [
            { text: "<html>", correct: false },
            { text: "<a>", correct: false },
            { text: "<!DOCTYPE html>", correct: true },
            {text: "<head>", correct: false }
        ]
    },
    {
        question: "What kind of brackets surrounds an array?",
        answers: [
            { text: "<>", correct: false },
            { text: "()", correct: false },
            { text: "{}", correct: false },
            {text: "[]", correct: true }
        ]
    },
    {
        question: "What is the symbol needed to target an id in css?",
        answers: [
            { text: "#", correct: true },
            { text: "!", correct: false },
            { text: ".", correct: false },
            {text: "@", correct: false }
        ]
    }
]