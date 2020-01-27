//DOM Elements

var startButtonEL = document.querySelector(`#start-btn`)
var nextButtonEl = document.querySelector(`#next-btn`)
var questionContainerEL = document.querySelector(`#question-container`)
var questionEL = document.querySelector(`#question`)
var answerBtnEL = document.querySelector(`#answer-buttons`)
var showScore = document.querySelector(`#your-score`)
var timeUpEL = document.querySelector(`#time-up`)
var timeLeftEL = document.querySelector(`#time-left`)
var highScoreEL = document.querySelector(`#high-score`)
var scoreNameEL = document.querySelector(`#score-name`)
var champNameEL = document.querySelector(`#name-input`)
var saveBtnEL = document.querySelector(`#save-btn`)
var timeRem = 0

var names = []



var scoreEL = 0

if (localStorage.getItem.highScoreEL != null) {
    highScoreEL.innerHTML = `Your last score was ` + localStorage.getItem(highScoreEL) + ` points!`
}

console.log(localStorage)

//Question Shuffler
var shuffleQuestions, currentQuestionIndex = undefined

//Game Start
startButtonEL.addEventListener(`click`, start)


//continue
nextButtonEl.addEventListener(`click`, () => {
    currentQuestionIndex++
    nextQuestion()
})

//start function
function start() {
    highScoreEL.classList.add(`hide`)
    saveBtnEL.classList.add(`hide`)
    timeUpEL.classList.add(`hide`)
    showScore.classList.add(`hide`)
    startButtonEL.classList.add(`hide`)
    timeRem = 60
    timeLeftEL.classList.remove(`hide`)
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEL.classList.remove(`hide`)
    nextQuestion()
    setTimeout(countdown, 60000)
    showTime()

}

//countdown function 


function countdown() {

    startButtonEL.classList.remove(`hide`)
    questionContainerEL.classList.add(`hide`)
    timeUpEL.classList.remove(`hide`)
    showScore.classList.remove(`hide`)
    localStorage.setItem(highScoreEL, scoreEL)
    showScore.innerHTML = `YOUR SCORE IS ` + scoreEL
    scoreNameEL.classList.remove(`hide`)
    saveBtnEL.classList.remove(`hide`)
}

//endgame function

function endgame() {
    timeRem = 0
    startButtonEL.classList.remove(`hide`)
    questionContainerEL.classList.add(`hide`)
    timeUpEL.innerHTML = `GOOD JOB`
    timeUpEL.classList.remove(`hide`)
    showScore.classList.remove(`hide`)
    showScore.innerHTML = `YOUR SCORE IS ` + scoreEL
    scoreNameEL.classList.remove(`hide`)
    saveBtnEL.classList.remove(`hide`)
}

function save() {
    localStorage.setItem(champNameEL.value, scoreEL)
    var block = document.createElement(`h1`)
    

}

function showTime() {
    timeLeftEL.classList.remove(`hide`)

    var timer = setInterval(function () {

        if (timeRem > 0) {
            timeRem--
            timeLeftEL.innerHTML = timeRem + ` Seconds left`

        } else {
            timeLeftEL.classList.add(`hide`)
            clearInterval(timer)

        }

    }, 1000)

}


//to the next quesiton
function nextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEL.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement(`button`)
        button.innerText = answer.text
        button.classList.add(`btn`)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener(`click`, pickAnswer)
        answerBtnEL.appendChild(button)
    });
}

//reset the answers
function resetState() {
    clearStatusClass(document.body)
    nextButtonEl.classList.add(`hide`)
    while (answerBtnEL.firstChild) {
        answerBtnEL.removeChild(answerBtnEL.firstChild)
    }
}

//Answer options
function pickAnswer(e) {
    var selectedAnswer = e.target
    var correct = selectedAnswer.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnEL.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButtonEl.classList.remove(`hide`)

    } else {
        startButtonEL.innerText = `Restart`
        startButtonEL.classList.remove(`hide`)
        endgame()
        clearTimeout()
    }
    nextButtonEl.classList.remove(`hide`)
}



//checking to see if answer is correct

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add(`correct`)
        scoreEL += timeRem
    } else {
        element.classList.add(`wrong`)
    }
}



//clear the previous check

function clearStatusClass(element) {
    element.classList.remove(`correct`)
    element.classList.remove(`wrong`)
}

