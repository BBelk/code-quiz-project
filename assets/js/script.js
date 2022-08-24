var startSection = document.querySelector("#start");
var quizSection = document.querySelector("#quiz");
var endSection = document.querySelector("#end");
var highscoreSection = document.querySelector("#highscoreSection");
var nav = document.querySelector("#nav");
var questionH3 = quizSection.querySelector("#questions").appendChild(document.createElement("h3"));
var timer = nav.appendChild(document.createElement("h3"));
var viewHighScore = nav.appendChild(document.createElement("h3"));
var wrongDisplay = quizSection.appendChild(document.createElement("p"));
var finalScore = document.querySelector("#finalScore");
console.log(finalScore);

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
    setTime();
    cursor = 0;
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

var state = "";
var SetState = function(state2){
    state = state2;
    startSection.setAttribute("style", "display:none");
    quizSection.setAttribute("style", "display:none");
    endSection.setAttribute("style", "display:none");
    highscoreSection.setAttribute("style", "display:none");

    if(state === "start"){
        startSection.setAttribute("style","" + sectionStyling);
    }
    if(state === "quiz"){
        quizSection.setAttribute("style", "" + sectionStyling);
    }
    if(state === "end"){
        endSection.setAttribute("style", "" + sectionStyling);
    }
    if(state === "highscore"){
        highscoreSection.setAttribute("style", "" + sectionStyling);
    }
};

var buttonStyling = "display:block; padding:3px: margin:auto; wdith:auto";
startButton.setAttribute("style", "" + buttonStyling);

function NextQuestion(){
    if(cursor >= questionsAndAnswers.length){EndQuiz(false);return;}

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


var timerInterval = null;
var secondsLeft;
function setTime() {
    secondsLeft = 60;
    timer.innerHTML = secondsLeft;
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    timer.innerHTML = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      EndQuiz(true);
    }

  }, 1000);
}

timer.innerHTML = "";
timer.setAttribute("style", "float:right");
viewHighScore.innerHTML = "View HighScores";
viewHighScore.setAttribute("style", "float:left; order:-1; color:blue; text-decoration:underline");

viewHighScore.onclick = () => {
    if(state !== "highscore"){
        SetState("highscore");
        timer.innerHTML = "";
        clearInterval(timerInterval);
        viewHighScore.innerHTML = "Back To Start";
        return;
    }
    if(state == "highscore"){
        SetState("start");
        viewHighScore.innerHTML = "View HighScores";
    }
  }

  function EndQuiz(outOfTime){
    if(outOfTime){
        SetState("end");
        timer.textContent = "Game Over!";
    }
    else{
        SetState("end");
        clearInterval(timerInterval);
        timer.textContent = "Final time: " + timer.textContent; 
    }
  }

  var score = 0;
  function AssignScore(){
    score = timeLeft;
    finalScore.innerHTML = "FINAL SCORE: " + score;
  }


SetState("start");



///////////////////////////////



