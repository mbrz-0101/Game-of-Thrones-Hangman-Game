function startNewGame() {
  let wordChoices = ["dragon", "tyrion", "jamie", "cersi", "hodor", "bran", "arya", "lannister", "sansa", "eddard", "greyjoy", "stark", "varys", "tyrell", "tommen", "joffrey", "targaryen", "danaeris", "littlefinger", "winter", "blackwater", "ygritte", "dorne", "westoros", "whatisdeadmayneverdie", "greyworm", ""];
  let houseChoices = ["assets/images/house-stark.png", "assets/images/house-tyrell.png", "assets/images/house-baratheon.png", "assets/images/house-greyjoy.png", "assets/images/house-martell.png", "assets/images/house-hoare.png", "assets/images/house-tully.png", "assets/images/house-targaryen.png", "assets/images/house-arryn.png", "assets/images/house-gardener.png", "assets/images/house-red-god.png", "assets/images/house-lannister.png"];
  let winCount = parseInt(document.getElementById("win-count").innerHTML) + 1;
  let guessCount = 13;
  let guessedLetters = Array(13);
  let guessedLettersCounter = 0;
  let wordToGuess = wordChoices[Math.floor(Math.random() * wordChoices.length)];
  let houseToDisplay = houseChoices[Math.floor(Math.random() * houseChoices.length)];
  let currentWordArray = Array(wordToGuess.length).fill("_");

  function hideInstructions() {
    document.getElementById("instructions").style.visibility = "hidden";
    document.getElementById("instructions").style.visibility = "hidden";
  }

  function updateCurrentWord(key) {
    for (var i = 0; i < wordToGuess.length; i++) {
      if (key == wordToGuess[i]) {
        currentWordArray[i] = key;
        document.getElementById("current-word").innerHTML = currentWordArray.join(" ");
      }
    }
  }

  function changeGuessCount(key) {
    if (wordToGuess.indexOf(key) < 0) {
      guessCount--;
      document.getElementById("guess-count").innerHTML = guessCount;
    }
  }

  function updateGuessedLetters(key) {
    guessedLetters[guessedLettersCounter] = key;
    guessedLettersCounter++;
    document.getElementById("guessed-letters").innerHTML = guessedLetters.join(" ");
  }

  function checkforWin() {
    if (currentWordArray.indexOf("_") == -1) {
      document.getElementById("instructions").style.visibility = "visible";
      document.getElementById("instructions").innerHTML = "Well done!! On to the next...";
      startNewGame();
    }
  }

  document.getElementById("current-word").innerHTML = currentWordArray.join(" ");
  document.getElementById("guess-count").innerHTML = guessCount;
  document.getElementById("win-count").innerHTML = winCount;
  document.getElementById("guessed-letters").innerHTML = guessedLetters.join(" ");
  document.getElementById("house-picture").src = houseToDisplay;

  if (winCount > 0) {
    let audio = document.createElement("audio");
    audio.src = "assets/audio/got-themesong.mp3";

    audio.addEventListener("canplaythrough", function () {
      audio.play();
    }, false);
  }

  document.onkeypress = function (event) {
    hideInstructions();
    if (guessedLetters.indexOf(event.key) == -1 && guessCount >= 0) {
      updateCurrentWord(event.key);
      changeGuessCount(event.key);
      updateGuessedLetters(event.key);
      checkforWin();
    }
    if (guessCount <= 0 && winCount > 3) {
      document.getElementById("game-space").innerHTML = "Wow! Good run!! Reload page to play again";
    } else if (guessCount <= 0) {
      document.getElementById("game-space").innerHTML = "You lose. Reload page to play again";
    }
  }
}



