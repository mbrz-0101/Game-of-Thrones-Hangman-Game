let currentWordChoices = ["dragon", "tyrion", "jamie", "cersi", "hodor", "bran", "arya", "lannister", "sansa", "eddard"];
let winCount = parseInt(document.getElementById("win-count").innerHTML) + 1;
let guessCount = 13;
let wordToGuess = currentWordChoices[Math.floor(Math.random() * currentWordChoices.length)];
let currentWordArray = Array(wordToGuess.length).fill("_");

                                                                                                      console.log(wordToGuess);

document.getElementById("current-word").innerHTML = currentWordArray.join(" ");
document.getElementById("guess-count").innerHTML = guessCount;
document.getElementById("win-count").innerHTML = winCount;


document.onkeypress = function(event) {
  console.log(event.key);
  hideInstructions();
  updateCurrentWord(event.key);
  changeGuessCount();
  updateGuessedLetters(event.key);
  checkforWin();
};

function hideInstructions() {
  document.getElementById("instructions").style.color = "white";
}

function changeWinCount() {
  winCount++;
  document.getElementById("win-count").innerHTML = winCount;
}

function updateCurrentWord(key) {
  let keyIndex = wordToGuess.indexOf(key);
  if (keyIndex > -1) {
    currentWordArray[keyIndex] = key;
    wordToGuess[keyIndex] = "_";
    document.getElementById("current-word").innerHTML = currentWordArray.join(" ");
  }
}

function changeGuessCount() {
  guessCount--;
  document.getElementById("guess-count").innerHTML = guessCount;
}

function updateGuessedLetters() {}
function checkforWin() {
  if (currentWordArray.indexOf("_") == -1) {
    document.getElementById("instructions").style.color = "black";
    document.getElementById("instructions").innerHTML = "You got it! Good job!";
    startNewGame();
  }
}

