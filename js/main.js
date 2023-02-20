const playSection = document.querySelector(".play-section");
const playButton = playSection.querySelector("#play-btn");
const playInput = playSection.querySelector("#play-round");

const playerSection = document.querySelector(".player-section");
const playerOptions = playerSection.querySelector(".player-options");
const playerOptionList = playerOptions.querySelectorAll("li");

const computerSection = document.querySelector(".computer-section");
const computerOptions = computerSection.querySelectorAll("li");
const nextRoundButton = computerSection.querySelector("#next-round-btn");
const replayButton = computerSection.querySelector("#replay-btn");
const scoreSection = computerSection.querySelector(".score-section");
const playerScoreSection = scoreSection.querySelector(".player-score");
const playerScoreDisplay = playerScoreSection.querySelector("p");
const computerScoreSection = scoreSection.querySelector(".computer-score");
const computerScoreDisplay = computerScoreSection.querySelector("p");
const totalScoreSection = computerSection.querySelector(".total-score-section");
const totalScoreText = totalScoreSection.querySelector("h3");

const gameResult = document.createElement("h3");

const options = ["rock", "paper", "scissor"];

// Values to keep track
let numberOfRounds = 0;
let playerSelectedOption = "";
let computerSelectedOption = "";
let playerScore = 0;
let computerScore = 0;

// Utility functions
function changeComponents(oldComponent, newComponent) {
  oldComponent.classList.remove("show");
  newComponent.classList.add("show");
}

function resetScore() {
  playerScore = 0;
  computerScore = 0;
}

function removeFinalResult() {
  totalScoreSection.classList.remove("show");
  scoreSection.style.display = "flex";
}

function toggleButtons(displayNextBtn, displayReplayBtn) {
  nextRoundButton.style.display = displayNextBtn;
  replayButton.style.display = displayReplayBtn;
}

function toggleScoreSection(totalScoreDisplay, scoreSectionDisplay) {
  if (totalScoreDisplay) {
    totalScoreSection.classList.add("show");
  } else {
    totalScoreSection.classList.remove("show");
  }
  scoreSection.style.display = scoreSectionDisplay;
}

// Display image of computer generated choice
function displayComputerChoice(computerSelectedOption) {
  computerOptions.forEach(function (computerOption) {
    if (computerOption.dataset.option === computerSelectedOption) {
      computerOption.style.display = "block";
    }
  });
}

// This function plays one round of the game and updating score
function playRound() {
  if (playerSelectedOption === computerSelectedOption) {
    console.log(
      `It's a tie! ${computerSelectedOption} ties ${playerSelectedOption}`
    );
  } else if (
    (playerSelectedOption === "rock" && computerSelectedOption === "paper") ||
    (playerSelectedOption === "paper" &&
      computerSelectedOption === "scissor") ||
    (playerSelectedOption === "scissor" && computerSelectedOption === "rock")
  ) {
    console.log(
      `You Lose! ${computerSelectedOption} beats ${playerSelectedOption}`
    );
    computerScore = computerScore + 1;
  } else {
    console.log(
      `You Win! ${playerSelectedOption} beats ${computerSelectedOption}`
    );
    playerScore = playerScore + 1;
  }
}

// This function prints final game result
function printResult() {
  if (playerScore > computerScore) {
    gameResult.textContent = "Player Wins !!!";
    gameResult.style.color = "var(--clr-green)";
  } else if (playerScore < computerScore) {
    gameResult.textContent = "Computer Wins !!!";
    gameResult.style.color = "var(--clr-accent)";
  } else {
    gameResult.textContent = "!!! It's a Tie !!!";
    gameResult.style.color = "var(--clr-grey)";
  }

  if (totalScoreSection.lastChild) {
    totalScoreSection.removeChild(totalScoreSection.lastChild);
  }
  totalScoreSection.appendChild(gameResult);
}

// Get number of rounds section
playSection.classList.add("show");

function isInputValid() {
  const reg = new RegExp("[0-9]");

  if (!reg.test(this.value)) {
    this.value = "";
  }

  if (this.value > 20) {
    this.value = 0;
  }
}

// Check if round entered is valid
function checkRound() {
  if (!numberOfRounds) {
    console.log("No rounds to play");
    return;
  }
  changeComponents(playSection, playerSection);
}

// This function will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’
function getComputerChoice() {
  // reset previous computer selected image options
  computerOptions.forEach(function (computerOption) {
    if (computerOption.dataset.option === computerSelectedOption) {
      computerOption.style.display = "none";
    }
  });
  const chosenIndex = Math.abs(Math.floor(Math.random() * options.length));

  computerSelectedOption = options[chosenIndex];

  displayComputerChoice(computerSelectedOption);

  playRound();

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;

  numberOfRounds -= 1;
  if (numberOfRounds !== 0) {
    toggleButtons("inline", "none");
  } else {
    toggleScoreSection(true, "none");
    toggleButtons("none", "inline");
    printResult();
  }
}

// This function will get players's choice
function getPlayerChoice() {
  const choice = this.dataset.option || "";

  if (!choice || !options.includes(choice)) {
    return null;
  }
  playerSelectedOption = choice;

  changeComponents(playerSection, computerSection);

  getComputerChoice();
}

playerOptionList.forEach(function (playerOption) {
  playerOption.addEventListener("click", getPlayerChoice);
});

playInput.addEventListener("keyup", isInputValid);

playButton.addEventListener("click", function (e) {
  numberOfRounds = parseInt(playInput.value);
  playInput.value = "";
  checkRound();
});

nextRoundButton.addEventListener("click", function (e) {
  changeComponents(computerSection, playerSection);
});

replayButton.addEventListener("click", function (e) {
  changeComponents(computerSection, playSection);
  resetScore();
  toggleScoreSection(false, "flex");
});
