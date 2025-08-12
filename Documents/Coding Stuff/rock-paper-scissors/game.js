const choices = document.querySelectorAll('#choices button');
const result = document.getElementById('result');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');
const timerSelect = document.getElementById('timerSelect');
const pointsSelect = document.getElementById('pointsSelect');

const moves = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;
let gameEnded = false;

let timerId = null;
let timerValue = 0;
let countdownInterval = null;

choices.forEach(button => {
  button.addEventListener('click', () => {
    if (gameEnded) return;
    clearTimer();
    playRound(button.dataset.move);
  });
});

timerSelect.addEventListener('change', () => {
  resetGame();
});

pointsSelect.addEventListener('change', () => {
  resetGame();
});

function playRound(playerMove) {
  if (gameEnded) return;

  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  // Determine winner
  if (playerMove === computerMove) {
    result.textContent = `Tie! You both chose ${playerMove}.`;
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    playerScore++;
    playerScoreSpan.textContent = playerScore;
    result.textContent = `You win! ${playerMove} beats ${computerMove}. 🎉`;
  } else {
    computerScore++;
    computerScoreSpan.textContent = computerScore;
    result.textContent = `You lose! ${computerMove} beats ${playerMove}. 😢`;
  }

  checkGameEnd();
  if (!gameEnded && timerSelect.value !== 'off') {
    startTimer(); // restart timer for next round
  }
}

function checkGameEnd() {
  const maxPoints = parseInt(pointsSelect.value, 10);

  if (playerScore >= maxPoints) {
    result.textContent = `🎉 You won the game ${playerScore} to ${computerScore}! 🎉`;
    gameEnded = true;
    disableChoices();
  } else if (computerScore >= maxPoints) {
    result.textContent = `😢 Computer won the game ${computerScore} to ${playerScore}. Try again!`;
    gameEnded = true;
    disableChoices();
  }
}

function disableChoices() {
  choices.forEach(button => button.disabled = true);
}

function enableChoices() {
  choices.forEach(button => button.disabled = false);
}

function resetGame() {
  clearTimer();
  playerScore = 0;
  computerScore = 0;
  gameEnded = false;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  result.textContent = '';
  enableChoices();
  if (timerSelect.value !== 'off') {
    startTimer();
  }
}

function startTimer() {
  clearTimer();
  timerValue = parseInt(timerSelect.value, 10);
  if (isNaN(timerValue) || timerValue <= 0) return;

  let timeLeft = timerValue;
  result.textContent = `Make your move! Auto-pick in ${timeLeft}...`;

  countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      result.textContent = `Make your move! Auto-pick in ${timeLeft}...`;
    } else {
      clearTimer();
      autoPick();
    }
  }, 1000);
}

function clearTimer() {
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = null;
  result.textContent = '';
}

function autoPick() {
  if (gameEnded) return;
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  playRound(randomMove);
}

resetGame();

