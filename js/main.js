// This function will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’
function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  const chosenIndex = Math.abs(Math.floor(Math.random() * choices.length));

  return choices[chosenIndex];
}

// This function will get players's choice
function getPlayerChoice() {
  const options = ["rock", "paper", "scissor"];
  const choice = prompt("Enter your choice").trim().toLowerCase();

  if (!choice || !options.includes(choice)) {
    return null;
  }
  return choice;
}

// This function plays one round of the game
function playRound(
  playerSelection,
  computerSelection,
  playerScore,
  computerScore
) {
  if (playerSelection === computerSelection) {
    console.log(`It's a tie! ${computerSelection} ties ${playerSelection}`);
  } else if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissor") ||
    (playerSelection === "scissor" && computerSelection === "rock")
  ) {
    console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
    computerScore = computerScore + 1;
  } else {
    console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
    playerScore = playerScore + 1;
  }
  return [playerScore, computerScore];
}

// This function prints total scores
function printScore(playerScore, computerScore) {
  console.log("---------------------------------------------");
  console.log(` Score - Player: ${playerScore} | Computer: ${computerScore}`);
  console.log("---------------------------------------------");

  if (playerScore > computerScore) {
    console.log("Player Wins ");
  } else if (playerScore < computerScore) {
    console.log("Computer wins");
  } else {
    console.log("It's a tie");
  }
}

// This function plays the game for 5 times
function game() {
  let playerScore = 0;
  let computerScore = 0;

  for (let i = 1; i <= 5; i++) {
    let playerSelection = getPlayerChoice();

    while (!playerSelection) {
      console.log("Entered wrong choice. Try again.");
      playerSelection = getPlayerChoice();
    }

    const computerSelection = getComputerChoice();

    [playerScore, computerScore] = playRound(
      playerSelection,
      computerSelection,
      playerScore,
      computerScore
    );
  }

  printScore(playerScore, computerScore);
}

// Start the game
game();
