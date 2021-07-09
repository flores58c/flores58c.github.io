var games = ["zelda","mario_bros","ice_climber","metroid","dino_crisis","resident_evil","sonic","kirby"];

let answer = '';
var maxWrong = 6;
var mistakes = 0;
let guessed = [];
let wordStatus = null;



function randomWord() {
  answer = games[Math.floor(Math.random() * games.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz_'.split('').map(letter =>
    `
      <button
        class="btn btn-dark"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// if the letter is not in the array add else return null. Explains ternary operator
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

  // sets off the button once clicked
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'img/hangMario' + mistakes + '.png';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
    
  }
}



function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    $("#keyboard").append(`<br> <img src  = "img/bowser.gif">`)
  }
}

// handles the array with guessed letters
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
   document.getElementById('hangmanPic').src = 'img/hangMario0.png';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();

$(document).ready(function()
  {
    
  
 $("#reset").css("color", "white");

 $("#reset").on("click", function(){
  alert("New game! [+..••]");
});

 $("#caption").css("font-family"," 'Play', sans-serif");
 $("button").css("font-family"," 'Play', sans-serif");
 $("#guesses").css("font-family"," 'Play', sans-serif");
  });

