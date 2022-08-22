var startSection = document.querySelector("#start");
var quizSection = document.querySelector("#quiz");
var endSection = document.querySelector("#end");
var questionH3 = quizSection.appendChild(document.createElement("h3"));

questionsAndAnswers = [
    {
        "question": "What is the capital of Thailand?",
        "answers": ["Singapore", "London", "Paris", "Berlin"]
    },
    {
        "question": "What is the capital of South Africa?",
        "answers": ["Probably Cape Town?", "Mexico City", "Delhi", "Sao Paolo"]
    },
];

var quizOl = document.createElement("ol");
quizSection.appendChild(quizOl);
var allLi = [];
var allButtons = [];
// for(questionItems of questionsAndAnswers){
//     allAnswersIl[quizOl.appendChild(document.createElement("il"))];
//     allAnswersIl[questionItems].appendChild(document.createElement("button"));
// }

for(var i = 0; i < 4; i++){
   allLi.push(quizOl.appendChild(document.createElement("il")));

   allButtons.push(allLi[i].appendChild(document.createElement("button")));
    // var newIl = allAnswersIl[quizOl.appendChild(document.createElement("il"))];
    // allAnswersIl[i].appendChild(document.createElement("p"));
}



var startButton = startSection.querySelector("#startButton");



// console.log("ALL ARRAY: " + questionsAndAnswers);
// console.log("..........................");
// console.log("FIRST OBJECT: " + questionsAndAnswers[0]);
// console.log("..........................");
// console.log("FIRST OBJECT QUESTION: " + questionsAndAnswers[0].question);


var SetState = function(state){
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
};


startButton.addEventListener('click', function(){
    console.log("TEST");
    SetState("quiz");
    NextQuestion();
});
var buttonStyling = "display:block; padding:3px";
var cursor = 0;
function NextQuestion(){
    for(newButton of allButtons){newButton.setAttribute("style", "display:none");}
    questionH3.textContent = "" + questionsAndAnswers[cursor].question;
    for(var i = 0; i < questionsAndAnswers[cursor].answers.length; i++){
        allButtons[i].textContent = "" +  questionsAndAnswers[cursor].answers[i];
        allButtons[i].setAttribute("style", "" + buttonStyling);
    }
    // for(newAs of questionsAndAnswers[cursor]){
    //     allButtons[newAs].innerHtml = "" + questionsAndAnswers[newAs];
    // }
    cursor++;
}


SetState("start");