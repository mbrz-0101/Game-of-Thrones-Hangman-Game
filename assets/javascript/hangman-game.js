/*
 * Hangman game is defined as function that will be called in index file.
 * Functions are defined to perform basic actions such as updating the html file with current word values
 * Lists of possible word choices as well as image sources are defined first
 */

function startNewGame() {
  // All possible word choices
  let wordChoices = ["dragon", "tyrion", "jamie", "cersi", "hodor", "bran", "arya", "lannister", "sansa", "eddard", "greyjoy", "stark", "varys", "tyrell", "tommen", "joffrey", "targaryen", "danaeris", "littlefinger", "winter", "blackwater", "ygritte", "dorne", "westoros", "whatisdeadmayneverdie", "greyworm", ""];
  // All image source choices
  let houseChoices = ["assets/images/house-stark.png", "assets/images/house-tyrell.png", "assets/images/house-baratheon.png", "assets/images/house-greyjoy.png", "assets/images/house-martell.png", "assets/images/house-hoare.png", "assets/images/house-tully.png", "assets/images/house-targaryen.png", "assets/images/house-arryn.png", "assets/images/house-gardener.png", "assets/images/house-red-god.png", "assets/images/house-lannister.png"];
  // Get number of wins from html
  let winCount = parseInt(document.getElementById("win-count").innerHTML) + 1;
  let guessCount = 13;
  let guessedLetters = Array(13);
  let guessedLettersCounter = 0;
  // Choose randome word and house banner
  let wordToGuess = wordChoices[Math.floor(Math.random() * wordChoices.length)];
  let houseToDisplay = houseChoices[Math.floor(Math.random() * houseChoices.length)];
  // Creates array of underscores to be displayed in the gamespace. This is a placeholder while the user guesses letters
  let currentWordArray = Array(wordToGuess.length).fill("_");

  // Declares hangmanGame with methods that are called later to exectute the game
  const hangmanGame = {

    // Hides instructions
    hideInstructions: function () {
      document.getElementById("instructions").style.visibility = "hidden";
    },

    // Changes underscore placeholder values in the currentWordArray to the value keyed by the user
    updateCurrentWord: function updateCurrentWord(key) {
      for (var i = 0; i < wordToGuess.length; i++) {
        if (key == wordToGuess[i]) {
          currentWordArray[i] = key;
          document.getElementById("current-word").innerHTML = currentWordArray.join(" ");
        }
      }
    },

    // If the user guesses incorrectly, this decrements the number remaining guesses
    changeGuessCount: function (key) {
      if (wordToGuess.indexOf(key) < 0) {
        guessCount--;
        document.getElementById("guess-count").innerHTML = guessCount;
      }
    },

    // Appends and logs array of letters that the user has already guessed.
    updateGuessedLetters: function (key) {
      guessedLetters[guessedLettersCounter] = key;
      guessedLettersCounter++;
      document.getElementById("guessed-letters").innerHTML = guessedLetters.join(" ");
    },

    // Checks for win - i.e. if all underscores have been replaced in currentWordArray
    checkforWin: function () {
      if (currentWordArray.indexOf("_") == -1) {
        document.getElementById("instructions").style.visibility = "visible";
        document.getElementById("instructions").innerHTML = "Well done!! On to the next...";
        startNewGame();
      }
    }
  };

  // Changes HTML to show updated currentWordArray, number of guesses left, number of wins, what letters they have guessed, and the random house banner picture
  document.getElementById("current-word").innerHTML = currentWordArray.join(" ");
  document.getElementById("guess-count").innerHTML = guessCount;
  document.getElementById("win-count").innerHTML = winCount;
  document.getElementById("guessed-letters").innerHTML = guessedLetters.join(" ");
  document.getElementById("house-picture").src = houseToDisplay;

  // When the user gets their first win, the audio plays
  if (winCount > 0) {
    let audio = document.createElement("audio");
    audio.src = "assets/audio/got-themesong.mp3";

    audio.addEventListener("canplaythrough", function () {
      audio.play();
      setTimeout(function() {
        audio.pause();
      }, 4000);
    }, false);
  }

  // On any key press, this hides instructions. Then if they have not guessed the letter, and have guesses left to use, it executes the 3 main functions then checks for the win condition.
  document.onkeypress = function (event) {
    hangmanGame.hideInstructions();
    if (guessedLetters.indexOf(event.key) == -1 && guessCount >= 0) {
      hangmanGame.updateCurrentWord(event.key);
      hangmanGame.changeGuessCount(event.key);
      hangmanGame.updateGuessedLetters(event.key);
      hangmanGame.checkforWin();
    }

    // If the user has no guesses left, this will show one of two final messages based on how many games they won
    if (guessCount <= 0 && winCount > 3) {
      document.getElementById("game-space").innerHTML = "Wow! Good run!! Reload page to play again";
    } else if (guessCount <= 0) {
      document.getElementById("game-space").innerHTML = "You lose. Reload page to play again";
    }
  }
}



