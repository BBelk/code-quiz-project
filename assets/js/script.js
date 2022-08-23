var startSection = document.querySelector("#start");
var quizSection = document.querySelector("#quiz");
var endSection = document.querySelector("#end");
var nav = document.querySelector("#nav");
var questionH3 = quizSection.querySelector("#questions").appendChild(document.createElement("h3"));
var timer = nav.appendChild(document.createElement("h3"));
var viewHighScore = nav.appendChild(document.createElement("h3"));
var wrongDisplay = quizSection.appendChild(document.createElement("p"));
wrongDisplay.innerHTML = "WRONG!";
wrongDisplay.setAttribute("style", "padding-top: 20px;display:none;margin:auto;width:auto");

var cursor = 0;


var buttonStyling = "display:flex; background:purple; border:solid, 5px, black; padding: 10px; margin:auto;"
var sectionStyling = "display:flex; width:100%; justify-content:center; flex-direction:column; padding: 10px; margin:auto;"

questionsAndAnswers = [
    {
        "question": "What is the capital of France?",
        "answers": ["Paris", "London", "Madrid", "Berlin"]
    },
    {
        "question": "What is the capital of South Africa?",
        "answers": ["Probably Cape Town?", "Mexico City", "Delhi", "Sao Paolo"]
    },
];

var quizOl = document.createElement("ol");
quizSection.querySelector("#questions").appendChild(quizOl);
// quizSection.appendChild(quizOl);
var allLi = [];
var allButtons = [];

var startButton = startSection.querySelector("#startButton");
var rightButton = null;
var wrongButtons = [];

for(var i = 0; i < 4; i++){
    allLi.push(quizOl.appendChild(document.createElement("il")));
    
    allButtons.push(allLi[i].appendChild(document.createElement("button")));
    if(i == 0){rightButton = allButtons[0];}
    else{wrongButtons.push(allButtons[i]);}
    
}

startButton.addEventListener('click', function(){
    console.log("TEST");
    SetState("quiz");
    NextQuestion();
});

rightButton.addEventListener('click', function(){
    RightAnswer();
});

for(newButton of wrongButtons){
    newButton.addEventListener('click', function(){
        WrongAnswer();
    });
}

function RightAnswer(){
    console.log("YOURE RIGHT");
    NextQuestion();
}

function WrongAnswer(){
    console.log("YOURE WRONG");
}

timer.innerHTML = "123";
timer.setAttribute("style", "float:right");
viewHighScore.innerHTML = "View HighScores";
viewHighScore.setAttribute("style", "float:left; order:-1");


var SetState = function(state){
    if(state === "start"){
        startSection.setAttribute("style","" + sectionStyling);
        quizSection.setAttribute("style", "display:none");
        endSection.setAttribute("style", "display:none");
        cursor = 0;
    }
    if(state === "quiz"){
        startSection.setAttribute("style","display:none");
        quizSection.setAttribute("style", "" + sectionStyling);
        endSection.setAttribute("style", "display:none");
    }
    if(state === "end"){
        startSection.setAttribute("style","display:none");
        quizSection.setAttribute("style", "display:none");
        endSection.setAttribute("style", "" + sectionStyling);
    }
};

var buttonStyling = "display:block; padding:3px: margin:auto; wdith:auto";
startButton.setAttribute("style", "" + buttonStyling);

function NextQuestion(){
    var randOrder = 0;
    for(var x = 0; x < allLi.length; x++){
        quizOl.appendChild(quizOl.children[Math.random() * x | 0]);
    }

    for(newButton of allButtons){newButton.setAttribute("style", "display:none");}
    questionH3.textContent = "" + questionsAndAnswers[cursor].question;
    for(var i = 0; i < questionsAndAnswers[cursor].answers.length; i++){
        allButtons[i].textContent = "" +  questionsAndAnswers[cursor].answers[i];
        allButtons[i].setAttribute("style", "" + buttonStyling);
    }
    cursor++;
}


SetState("start");