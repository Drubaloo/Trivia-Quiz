//DOM Elements

var startButtonEL = document.querySelector(`#start-btn`)
var nextButtonEl = document.querySelector(`#next-btn`)
var questionContainerEL = document.querySelector(`#question-container`)
var questionEL = document.querySelector(`#question`)
var answerBtnEL = document.querySelector(`#answer-buttons`)
var scoreElem = document.querySelector(`#your-score`)
var timeUpEL = document.querySelector(`#time-up`)
var timeLeftEL = document.querySelector(`#time-left`)

var timer = setInterval(countdown, 60000)

var scoreEL = 0

timeLeftEL = scoreEL
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
function start(){
    startButtonEL.classList.add(`hide`)
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEL.classList.remove(`hide`)
    nextQuestion()
    timer
    timeLeftEL.classList.remove(`hide`)
    timeLeftEL.innerHTML = timer

    
}

//countdown function
function countdown(){
    startButtonEL.classList.remove(`hide`)
    questionContainerEL.classList.add(`hide`)
    timeUpEL.classList.remove(`hide`)
    scoreElem.classList.remove(`hide`)
    scoreElem.innerHTML = `YOUR SCORE IS ` + scoreEL
}




//to the next quesiton
function nextQuestion(){
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question){
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
function resetState(){
    clearStatusClass(document.body)
    nextButtonEl.classList.add(`hide`)
    while (answerBtnEL.firstChild) {
        answerBtnEL.removeChild(answerBtnEL.firstChild)
    }
}

//Answer options
function pickAnswer(e){
var selectedAnswer = e.target
var correct = selectedAnswer.dataset.correct
setStatusClass(document.body, correct)
Array.from(answerBtnEL.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
})
if (shuffleQuestions,length > currentQuestionIndex + 1){
    nextButtonEl.classList.remove(`hide`)
} else {
    startButtonEL.innerText = `Restart`
    startButtonEL.classList.remove(`hide`)
    clearTimeout
}
nextButtonEl.classList.remove(`hide`)
}



//checking to see if answer is correct

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add(`correct`)
        scoreEL++
    }   else {
        element.classList.add(`wrong`)
    }
}

//clear the previous check

function clearStatusClass(element) {
    element.classList.remove(`correct`)
    element.classList.remove(`wrong`)
}

