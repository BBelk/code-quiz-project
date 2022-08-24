var startSection = document.querySelector("#start");
var quizSection = document.querySelector("#quiz");
var endSection = document.querySelector("#end");
var highscoreSection = document.querySelector("#highscoreSection");
var finalScore = document.querySelector("#finalScore");
var submitButton = endSection.querySelector("#submitButton");
var startAgainButton = highscoreSection.querySelector("#startAgain");
var resetButton = highscoreSection.querySelector("#reset");
var nav = document.querySelector("#nav");
var questionH3 = quizSection.querySelector("#questions").appendChild(document.createElement("h3"));
var timer = nav.appendChild(document.createElement("h3"));
var viewHighScore = nav.appendChild(document.createElement("h3"));
var wrongDisplay = quizSection.appendChild(document.createElement("p"));
var highScoreOl = document.querySelector("#highscoreOrderedList");





var cursor = 0;


var buttonStyling = "display:flex; background:purple; border:solid, 5px, black; padding: 10px; margin:auto;"
var sectionStyling = "display:flex; width:100%; justify-content:center; flex-direction:column; padding: 10px; margin:auto;"

questionsAndAnswers = [
    {
        "question": "Which built-in method combines the text of two strings and returns a new string?",
        "answers": ["concat()", "append()", "attach()", "splice()"]
    },
    {
        "question": "Which of the following function of Number object returns the number's value?",
        "answers": ["lastIndexOf()", "search()", "substr()", "indexOf()"]
    },
    {
        "question": "Which of the following function of Array object calls a function for each element in the array?",
        "answers": ["forEach()", "every()", "concat()", "filter()"]
    },
    {
        "question": "Which of the following function of Array object returns a string representing the array and its elements?",
        "answers": ["toString()", "toSource()", "splice()", "sort()"]
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
    // console.log("TEST");
    SetState("quiz");
    setTime();
    cursor = 0;
    wrongPoints = 0;
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
    // console.log("YOURE RIGHT");
    NextQuestion();
    ShowCorrect();
    setTimeout(HideWrong, 1000);
}

var wrongPoints = 0;
function WrongAnswer(){
    // console.log("YOURE WRONG");
    wrongPoints += 1;
    secondsLeft -= 5;
    NextQuestion();
    // wrongDisplay.innerHTML = "WRONG!";
    ShowWrong();
    setTimeout(HideWrong, 1000);
}

function HideWrong(){
    wrongDisplay.innerHTML = "WRONG!";
    wrongDisplay.setAttribute("style", "padding-top: 20px;display:none;margin:auto;width:auto");
}

function ShowWrong(){
    wrongDisplay.innerHTML = "WRONG!";
    wrongDisplay.setAttribute("style", "padding-top: 20px;display:block;margin:auto;width:auto");
}

function ShowCorrect(){
    wrongDisplay.innerHTML = "CORRECT!";
    wrongDisplay.setAttribute("style", "padding-top: 20px;display:block;margin:auto;width:auto");
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
        // SetState("highscore");
        OpenHighScoreScreen();
        timer.innerHTML = "";
        clearInterval(timerInterval);
        viewHighScore.innerHTML = "Back To Start";
        return;
    }
    if(state == "highscore"){
        StartAgain();
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
    AssignScore();
  }

  var score = 0;
  function AssignScore(){
    score = (secondsLeft - (wrongPoints * 5));
    if(wrongPoints >= questionsAndAnswers.length || score < 0){
        score = 0;
    }
    finalScore.innerHTML = "FINAL SCORE: " + score;
  }

  submitButton.addEventListener('click', function(){
    var newInput = document.getElementById("inputText").value;
    if(newInput == ""){alert("You must enter your initials.");return;}
    WriteNewHighScore(score, newInput);
    // SetState("highscore");
    OpenHighScoreScreen();
    document.getElementById("inputText").value = "";
  });

    

  function WriteNewHighScore(score, initials){
    var allHighScores = JSON.parse(localStorage.getItem("allScores")) || [];
    // console.log("SCORE IS: " + score + "  INITALS ARE: " + initials);
    var newEntry = {
        inScore: score,
        inInitials: initials
    };
    allHighScores.push(newEntry);
    localStorage.setItem("allScores", JSON.stringify(allHighScores));

  }

  function OpenHighScoreScreen(){
    var allHighScores = JSON.parse(localStorage.getItem("allScores")) || [];
    viewHighScore.innerHTML = "Back To Start";
    timer.innerHTML = "";
    SetState("highscore");
    ReadHighScores();
  }

  function ReadHighScores(){
    var allHighScores = JSON.parse(localStorage.getItem("allScores"));
    // console.log("Reading highscores" + allHighScores[0].inInitials);
    if(allHighScores == []){console.log("NO HIGH SCORES");return;}
    if(allHighScores.length > 1){allHighScores.sort((a, b) => (a.inScore < b.inScore) ? 1 : -1);}
    for(var x = 0; x < allHighScores.length; x++){
        // highScoreOl.appendChild(document.createElement<"li>");
        // highscoreEntryArray.push(.document.createElement<"li">.appendChild)
        highscoreEntryArray.push(highScoreOl.appendChild(document.createElement("il")));
        // console.log("GENERATEED ENTRY");
        highscoreEntryArray[x].innerHTML = "SCORE: " + allHighScores[x].inScore + " INITIALS: " + allHighScores[x].inInitials;
        highscoreEntryArray[x].setAttribute("style", "background-color: black; color:white"); 
        //im tired, sorry
        if(x % 2 == 0){
            highscoreEntryArray[x].setAttribute("style", "background-color: white; color:black"); 
        }
    }
  }


var highscoreEntryArray = [];
  function ResetHighScores(erase){
    for(newEl of highscoreEntryArray){
        newEl.remove();
    }
    highscoreEntryArray = [];
    allHighScores = [];
    localStorage.setItem("allScores", JSON.stringify(allHighScores));
    ReadHighScores();
  }

  function StartAgain(){
    SetState("start");
        viewHighScore.innerHTML = "View HighScores";
  }
  
  startAgainButton.addEventListener('click', function(){
    StartAgain();
  });

  resetButton.addEventListener('click', function(){
    ResetHighScores();
  });





SetState("start");



///////////////////////////////



