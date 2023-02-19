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

let numberOfRounds = 0;
let playerSelectedOption = "";
let computerSelectedOption = "";
let playerScore = 0;
let computerScore = 0;

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

// This function plays one round of the game
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

// This function will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’
function getComputerChoice() {
  computerOptions.forEach(function (computerOption) {
    if (computerOption.dataset.option === computerSelectedOption) {
      computerOption.style.display = "none";
    }
  });
  const choices = ["rock", "paper", "scissor"];
  const chosenIndex = Math.abs(Math.floor(Math.random() * choices.length));

  computerSelectedOption = choices[chosenIndex];

  displayComputerChoice(computerSelectedOption);
  // changeComponents()
  playRound();
  // debugger;
  numberOfRounds -= 1;
}

function displayComputerChoice(computerSelectedOption) {
  computerOptions.forEach(function (computerOption) {
    if (computerOption.dataset.option === computerSelectedOption) {
      computerOption.style.display = "block";
    }
  });
}

// This function will get players's choice
function getPlayerChoice() {
  // debugger;
  const options = ["rock", "paper", "scissor"];
  const choice = this.dataset.option || "";

  if (!choice || !options.includes(choice)) {
    return null;
  }
  playerSelectedOption = choice;
  console.log(choice);

  if (numberOfRounds !== 0) {
    nextRoundButton.style.display = "inline";
    replayButton.style.display = "none";
  } else {
    nextRoundButton.style.display = "none";
    replayButton.style.display = "inline";
  }
  changeComponents(playerSection, computerSection);
  getComputerChoice();
}

function changeComponents(firstComponent, secondComponent) {
  firstComponent.classList.remove("show");
  secondComponent.classList.add("show");
}

function getRound() {
  if (!numberOfRounds) {
    console.log("No rounds to play");
    return;
  }
  console.log(numberOfRounds);
  changeComponents(playSection, playerSection);
}

function game() {
  // getPlayerChoice()
  // for (let i = 1; i <= numberOfRounds; i++) {
  // [playerScore, computerScore] = playRound(
  //   playerSelection,
  //   computerSelection,
  //   playerScore,
  //   computerScore
  // );
  // }
  // printScore(playerScore, computerScore);
  // }
}

playerOptionList.forEach(function (playerOption) {
  playerOption.addEventListener("click", getPlayerChoice);
});
playInput.addEventListener("keyup", isInputValid);

playButton.addEventListener("click", function (e) {
  numberOfRounds = parseInt(playInput.value);
  getRound();
});

nextRoundButton.addEventListener("click", function (e) {
  changeComponents(computerSection, playerSection);
});

replayButton.addEventListener("click", function (e) {
  changeComponents(computerSection, playSection);
});

// // This function prints total scores
// function printScore(playerScore, computerScore) {
//   console.log("---------------------------------------------");
//   console.log(` Score - Player: ${playerScore} | Computer: ${computerScore}`);
//   console.log("---------------------------------------------");

//   if (playerScore > computerScore) {
//     console.log("Player Wins ");
//   } else if (playerScore < computerScore) {
//     console.log("Computer wins");
//   } else {
//     console.log("It's a tie");
//   }
// }

// // Start the game
// game();
