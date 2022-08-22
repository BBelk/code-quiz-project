var startSection = document.querySelector("#start");
var quizSection = document.querySelector("#quiz");
var endSection = document.querySelector("#end");

questionsAndAnswers = [
    {
        "question": "What is the capital of Thailand?",
        "answer0": "Bangkok",
        "answer1": "Is this knowable?",
        "answer2": "Singapore",
        "answer3": "Aren't they changing it? Or is that Malaysia?"
    },
    {
        "question": "Second Question",
        "answer0": "Second A0",
        "answer1": "Second A1",
        "answer2": "Second A2",
        "answer3": "Second A3"
    },
    {
        "question": "Third Question",
        "answer0": "Third A0",
        "answer1": "Third A1",
        "answer2": "Third A2",
        "answer3": "Third A3"
    },
    {
        "question": "Fourth Question",
        "answer0": "Fourth A0",
        "answer1": "Fourth A1",
        "answer2": "Fourth A2",
        "answer3": "Fourth A3"
    }
];
var quizOl = document.createElement("ol");
quizSection.appendChild(quizOl);
var allAnswersIl = [];
for(questionItems of questionsAndAnswers){
    allAnswersIl[quizOl.appendChild(document.createElement("il"))];
}

var startButton = startSection.querySelector("#startButton");



// console.log("ALL ARRAY: " + questionsAndAnswers);
// console.log("..........................");
// console.log("FIRST OBJECT: " + questionsAndAnswers[0]);
// console.log("..........................");
// console.log("FIRST OBJECT QUESTION: " + questionsAndAnswers[0].question);


var setState = function(state){
    if(state === "start"){
        startSection.setAttribute("style","display:block");
        quizSection.setAttribute("style", "display:none");
        endSection.setAttribute("style", "display:none");
    }
    if(state === "quiz"){
        startSection.setAttribute("style","display:none");
        quizSection.setAttribute("style", "display:block");
        endSection.setAttribute("style", "display:none");
    }
    if(state === "end"){
        startSection.setAttribute("style","display:none");
        quizSection.setAttribute("style", "display:none");
        endSection.setAttribute("style", "display:block");
    }
}


startButton.addEventListener('click', function(){
    setState("quiz");
});


setState("start");