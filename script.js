const questions = [
    {
        question : "Who is your firstName?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Batyrbek", correct: true},
            { text: "Jamilya", correct: false},
            { text: "Alibi", correct: false}
        ]
    },
    {
        question : "Who is your firstName 2?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Batyrbek", correct: true},
            { text: "Jamilya", correct: false},
            { text: "Alibi", correct: false}
        ]
    },
    {
        question : "Who is your firstName 3?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Batyrbek", correct: true},
            { text: "Jamilya", correct: false},
            { text: "Alibi", correct: false}
        ]
    },
    {
        question : "Who is your firstName 4?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Batyrbek", correct: true},
            { text: "Jamilya", correct: false},
            { text: "Alibi", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answer-buttons");
const nextButtonElement = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButtonElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })

}

function resetState(){
    nextButtonElement.style.display = "none";
    while(answersElement.firstChild){
        answersElement.removeChild(answersElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersElement.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButtonElement.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButtonElement.addEventListener("click", ()=> {
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length} questions!`;
    nextButtonElement.innerHTML = "Play again";
    nextButtonElement.style.display = "block";
}

startQuiz();