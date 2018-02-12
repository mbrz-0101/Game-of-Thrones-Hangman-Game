function startNewGame() {
  let currentWordChoices = ["dragon", "tyrion", "jamie", "cersi", "hodor", "bran", "arya", "lannister", "sansa", "eddard"];
  let winCount = parseInt(document.getElementById("win-count").innerHTML) + 1;
  let guessCount = 13;
  let guessedLetters = Array(13);
  let guessedLettersCounter = 0;
  let wordToGuess = currentWordChoices[Math.floor(Math.random() * currentWordChoices.length)];
  let currentWordArray = Array(wordToGuess.length).fill("_");
  
  console.log(wordToGuess);
  
  document.getElementById("current-word").innerHTML = currentWordArray.join(" ");
  document.getElementById("guess-count").innerHTML = guessCount;
  document.getElementById("win-count").innerHTML = winCount;
  
  
  document.onkeypress = function (event) {
    console.log(event.key);
    hideInstructions();
    if (guessedLetters.indexOf(event.key) == -1) {
      updateCurrentWord(event.key);
      changeGuessCount();
      updateGuessedLetters(event.key);
      checkforWin();
    }
  };
  
  function hideInstructions() {
    document.getElementById("instructions").style.color = "white";
  }
  
  function changeWinCount() {
    winCount++;
    document.getElementById("win-count").innerHTML = winCount;
  }
  
  function updateCurrentWord(key) {
    for (var i = 0; i < wordToGuess.length; i++) {
      if (key == wordToGuess[i]) {
        currentWordArray[i] = key;
        document.getElementById("current-word").innerHTML = currentWordArray.join(" ");
      }
    }
  
  
  
  
  
  }
  
  function changeGuessCount() {
    guessCount--;
    document.getElementById("guess-count").innerHTML = guessCount;
  }
  
  function updateGuessedLetters(key) {
    guessedLetters[guessedLettersCounter] = key;
    guessedLettersCounter++;
    document.getElementById("guessed-letters").innerHTML = guessedLetters.join(" ");
  }
  function checkforWin() {
    if (currentWordArray.indexOf("_") == -1) {
      document.getElementById("instructions").style.color = "black";
      document.getElementById("instructions").innerHTML = "You got it! Good job! Here's your next word...";
      startNewGame();
    }
  }
}


