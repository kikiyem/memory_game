//Global Variables
var pattern = [];
var patternLength = 100;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var gameMode; //0 = classic, 1 = intense
var gameModeScore;
var highScore0 = 0;
var highScore1 = 0;
var screenMode; //0=gameOver, 1 = Win (used for class index)

// global constants
const clueHoldTime = 400; //how long to hold each clue's light/sound
const cluePauseTime = 200; //how long to pause in between clues
const nextClueWaitTime = 700; //how long to wait before starting playback of the clue sequence

//game sound
let gameOverAudio = new Audio(
  "https://cdn.glitch.global/9b5dd601-1878-4a6b-9bfe-0bf5fbbb62da/gameOver.wav?v=1648176725207"
);
let winGameAudio = new Audio(
  "https://cdn.glitch.global/9b5dd601-1878-4a6b-9bfe-0bf5fbbb62da/win.wav?v=1648399367899"
);
gameOverAudio.volume = 0.5;
winGameAudio.volume = 0.5;

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  11: 291.6,
  12: 339.6,
  13: 342,
  14: 456.2,
  15: 211.6,
  16: 359.6,
  17: 312,
  18: 426.2,
  19: 221.6,
};

//Random game pattern for classic mode
function getClassicPattern() {
  //loops through patternLength
  for (let i = 0; i < patternLength; i++) {
    //assigns random number between 1 and 4
    var randomNumber = Math.floor(Math.random() * 4 + 1);
    //pushes number to pattern array
    pattern.push(randomNumber);
  }
}

//Random game pattern for intense mode
function getIntensePattern() {
  //loops through patternLength
  for (let i = 0; i < patternLength; i++) {
    //assigns random number between 11 and 19
    var randomNumber = Math.floor(Math.random() * 9 + 11);
    //pushes number to pattern array
    pattern.push(randomNumber);
  }
}

function classic() {
  gameMode = 0;
  gameModeScore = 0;
  document.querySelector(".startPopup").style.display = "none";
  document.getElementById("classic").style.display = "grid";
  document.getElementsByClassName("stopBtn")[0].style.display = "block";
  document.getElementById("classicScoreFormat").classList.remove("hidden");
  pattern = [];
  progress = 0;
  gamePlaying = true;
  getClassicPattern();
  playClueSequence();
}

function intense() {
  gameMode = 1;
  gameModeScore = 0;
  document.querySelector(".startPopup").style.display = "none";
  document.getElementById("intense").style.display = "grid";
  document.getElementsByClassName("stopBtn")[1].style.display = "block";
  document.getElementById("intenseScoreFormat").classList.remove("hidden");
  pattern = [];
  progress = 0;
  gamePlaying = true;
  getIntensePattern();
  playClueSequence();
}

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  let hold = clueHoldTime;
  let pause = cluePauseTime;
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    // console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
    if (gameMode == 0) {
      document.getElementsByClassName("score")[0].innerHTML = i;
      gameModeScore = i;
    } else {
      if (gameMode == 1) {
        document.getElementsByClassName("score")[1].innerHTML = i;
        gameModeScore = i;
        // makes clues faster
        hold -= 50;
        pause -= 25;
        delay -= 150;
      }
    }
  }
}

function guess(btn) {
  // console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    //Guess was correct!
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        wonGame();
      } else {
        //Pattern correct. Add next segment
        progress++;
        playClueSequence();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  } else {
    //Guess was incorrect
    //GAME OVER
    endGame();
  }
}

function endGame() {
  highScore();
}

function highScore() {
  if (gameMode == 0) {
    if (gameModeScore > highScore0) {
      highScore0 = gameModeScore;
      wonGame();
    } else {
      loseGame();
    }
  } else {
    if (gameMode == 1) {
      if (gameModeScore > highScore1) {
        highScore1 = gameModeScore;
        wonGame();
      } else {
        loseGame();
      }
    }
  }
}

function stopGameBtn() {
  stopGame();
  endGame();
}

function stopGame() {
  gamePlaying = false;
  if (gameMode == 0) {
    document.getElementsByClassName("stopBtn")[0].style.display = "none";
    document.getElementById("classicScoreFormat").classList.add("hidden");
  } else {
    if (gameMode == 1) {
      document.getElementsByClassName("stopBtn")[1].style.display = "none";
      document.getElementById("intenseScoreFormat").classList.add("hidden");
    }
  }
}

function loseGame() {
  screenMode = 0;
  gameOverAudio.play();
  document.getElementsByClassName("popupScore")[0].innerHTML = gameModeScore;

  if (gameMode == 0) {
    document.getElementsByClassName("highScore")[0].innerHTML = highScore0;
  } else {
    if (gameMode == 1) {
      document.getElementsByClassName("highScore")[0].innerHTML = highScore1;
    }
  }

  document.querySelector(".losePopup").style.display = "block";
  appear();
  stopGame();
}

function wonGame() {
  screenMode = 1;
  winGameAudio.play();
  document.getElementsByClassName("popupScore")[1].innerHTML = gameModeScore;

  if (gameMode == 0) {
    document.getElementsByClassName("highScore")[1].innerHTML = highScore0;
  } else {
    if (gameMode == 1) {
      document.getElementsByClassName("highScore")[1].innerHTML = highScore1;
    }
  }
  document.querySelector(".winPopup").style.display = "block";
  appear();
  stopGame();
}

function playAgain() {
  //Gameover pop up disappers when play again is clicked
  document.querySelector(".losePopup").style.display = "none";
  document.querySelector(".winPopup").style.display = "none";
  if (gameMode == 0) {
    classic();
  } else {
    if (gameMode == 1) {
      intense();
    }
  }
}

function menu() {
  //Gameover pop up disappers when play again is clicked and goes back to start up screen
  document.querySelector(".losePopup").style.display = "none";
  document.querySelector(".winPopup").style.display = "none";
  document.getElementById("intense").style.display = "none";
  document.getElementById("classic").style.display = "none";
  document.querySelector(".startPopup").style.display = "block";
}

function buttonclick() {
  //button click sound
  let click = new Audio(
    "https://cdn.glitch.global/9b5dd601-1878-4a6b-9bfe-0bf5fbbb62da/mixkit-game-click-1114.wav?v=1648611557138"
  );
  click.volume = 0.5;
  click.playbackRate = 16;
  click.play();
}

function leaderboard() {
  document.querySelector(".leaderboardPopup").style.display = "block";
  document.querySelector(".classicScoreContainer").style.display = "block";
  document.getElementById("classicLeaderBtn").classList.add("lit");
  document.getElementById("intenseLeaderBtn").classList.remove("lit");
  // table()
}
function leaderboardback() {
  document.querySelector(".leaderboardPopup").style.display = "none";
  document.querySelector(".classicScoreContainer").style.display = "none";
  document.querySelector(".intenseScoreContainer").style.display = "none";
}

function classicScoreContainer() {
  document.querySelector(".classicScoreContainer").style.display = "block";
  document.querySelector(".intenseScoreContainer").style.display = "none";
  document.getElementById("classicLeaderBtn").classList.add("lit");
  document.getElementById("intenseLeaderBtn").classList.remove("lit");
}

function intenseScoreContainer() {
  document.querySelector(".classicScoreContainer").style.display = "none";
  document.getElementById("classicLeaderBtn").classList.remove("lit");
  document.querySelector(".intenseScoreContainer").style.display = "block";
  document.getElementById("intenseLeaderBtn").classList.add("lit");
}
// var totalClassicRowCount = 0;
// var totalIntenseRowCount = 0;

// function numberOfRows() {
//   if (gameMode == 0) {

//     var classicRowCount = 0;
//     var table = document.getElementById("classicTable");
//     var rows = table.getElementsByTagName("tr")
//     for (var i = 0; i < rows.length; i++) {
//         totalClassicRowCount++;
//         alert(totalClassicRowCount);
//       if (rows[i].getElementsByTagName("td").length > 0) {
//                             classicRowCount++;
//       }
//     }
//   }else{
//     if (gameMode == 1) {
//       var totalIntenseRowCount = 0;
//       var intenseRowCount = 0;
//       var table = document.getElementById("intenseTable");
//       var rows = table.getElementsByTagName("tr")
//       for (var i = 0; i < rows.length; i++) {
//           totalIntenseRowCount++;
//         if (rows[i].getElementsByTagName("td").length > 0) {
//                               intenseRowCount++;
//         }
//       }
//     }
//   }
// }

function leaderboardRow() {
  // numberOfRows()
  // alert(totalClassicRowCount)
  //   need to add if the score is more than the smallest score or if there are less than 10 scores on leaderboard
  if (gameMode == 0) {
    var tbodyRef = document
      .getElementById("classicTable")
      .getElementsByTagName("tbody")[0];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();

    // Insert a cell at the end of the row
    var newCell0 = newRow.insertCell(0);
    var newCell1 = newRow.insertCell(1);
    var newCell2 = newRow.insertCell(2);
    // Append a text node to the cell
    var newText = document.createTextNode("new row");

    if (screenMode == 0) {
      var nameValue = document.getElementsByClassName("name")[0].value;
      newCell0.appendChild(document.createTextNode(classicRank.length + 1));
      newCell1.appendChild(document.createTextNode(nameValue));
      newCell2.appendChild(document.createTextNode(gameModeScore));
      classicRank.push(classicRank.length + 1);
      classicLeaderboardNames.push(nameValue);
      classicLeaderboardScores.push(gameModeScore);
    } else {
      if (screenMode == 1) {
        var nameValue = document.getElementsByClassName("name")[1].value;
        newCell0.appendChild(document.createTextNode(classicRank.length + 1));
        newCell1.appendChild(document.createTextNode(nameValue));
        newCell2.appendChild(document.createTextNode(gameModeScore));
        classicRank.push(classicRank.length + 1);
        classicLeaderboardNames.push(nameValue);
        classicLeaderboardScores.push(gameModeScore);
      }
    }
    // localStorage.setItem("newleaderboardNames", JSON.stringify(leaderboardNames));
    alert("saved");
    disappear();
  } else {
    if (gameMode == 1) {
      var tbodyRef = document
        .getElementById("intenseTable")
        .getElementsByTagName("tbody")[0];

      // Insert a row at the end of table
      var newRow = tbodyRef.insertRow();

      // Insert a cell at the end of the row
      var newCell0 = newRow.insertCell(0);
      var newCell1 = newRow.insertCell(1);
      var newCell2 = newRow.insertCell(2);
      // Append a text node to the cell
      var newText = document.createTextNode("new row");

      if (screenMode == 0) {
        var nameValue = document.getElementsByClassName("name")[0].value;
        newCell0.appendChild(document.createTextNode(intenseRank.length + 1));
        newCell1.appendChild(document.createTextNode(nameValue));
        newCell2.appendChild(document.createTextNode(gameModeScore));
        intenseRank.push(intenseRank.length + 1);
        intenseLeaderboardNames.push(nameValue);
        intenseLeaderboardScores.push(gameModeScore);
      } else {
        if (screenMode == 1) {
          var nameValue = document.getElementsByClassName("name")[1].value;
          newCell0.appendChild(document.createTextNode(intenseRank.length + 1));
          newCell1.appendChild(document.createTextNode(nameValue));
          newCell2.appendChild(document.createTextNode(gameModeScore));
          intenseRank.push(intenseRank.length + 1);
          intenseLeaderboardNames.push(nameValue);
          intenseLeaderboardScores.push(gameModeScore);
        }
      }
      // localStorage.setItem("newleaderboardNames", JSON.stringify(leaderboardNames));
      alert("saved");
      disappear();
    }
  }
}

function disappear() {
  document.getElementsByClassName("submitDisappear")[0].style.display = "none";
  document.getElementsByClassName("submitDisappear")[1].style.display = "none";
}
function appear() {
  document.getElementsByClassName("submitDisappear")[0].style.display = "block";
  document.getElementsByClassName("submitDisappear")[1].style.display = "block";
}

var classicRank = [];
var classicLeaderboardNames = [];
var classicLeaderboardScores = [];
var intenseRank = [];
var intenseLeaderboardNames = [];
var intenseLeaderboardScores = [];
// var storedNames = JSON.parse(localStorage.getItem("newleaderboardNames"))

// function table(){
//     var leaderboardNames = JSON.parse(storedNames);
//     alert (leaderboardNames.length)
//     for (let i = 0; i < leaderboardNames; i++) {
//       document.getElementById("myTable").rows[i+1].cells.item(1).innerHTML = leaderboardNames[i]
//   }

// }
