const clickBtn = document.getElementById('clickBtn');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('timeDisplay');
const restartBtn = document.getElementById('restartBtn');
const pauseResumeBtn = document.getElementById('pauseResumeBtn');
const timerSelect = document.getElementById('timerSelect');

let clicks = 0;
let totalTime = parseInt(timerSelect.value);
let timeLeft = totalTime;
let timerId = null;
let isPaused = false;
let countdownInterval = null;

function updateScore() {
  scoreDisplay.textContent = `Clicks: ${clicks}`;
}

function updateTimeDisplay() {
  timeDisplay.textContent = timeLeft;
}

function startTimer() {
  timerId = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      updateTimeDisplay();

      if (timeLeft <= 0) {
        endGame();
      }
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerId);
  clickBtn.disabled = true;
  pauseResumeBtn.style.display = 'none';
  restartBtn.style.display = 'inline-block';
  updateTimeDisplay();
}

function startGame() {
  clicks = 0;
  totalTime = parseInt(timerSelect.value);
  timeLeft = totalTime;
  updateScore();
  updateTimeDisplay();

  clickBtn.disabled = false;
  pauseResumeBtn.textContent = 'Pause';
  pauseResumeBtn.style.display = 'inline-block';
  restartBtn.style.display = 'none';

  isPaused = false;

  if (timerId) clearInterval(timerId);
  if (countdownInterval) clearInterval(countdownInterval);

  startTimer();
}

clickBtn.addEventListener('click', () => {
  if (!clickBtn.disabled && !isPaused) {
    clicks++;
    updateScore();
  }
});

restartBtn.addEventListener('click', () => {
  startGame();
});

pauseResumeBtn.addEventListener('click', () => {
  if (!isPaused) {
    // Pause the game
    isPaused = true;
    pauseResumeBtn.textContent = 'Resume';
    clickBtn.disabled = true;
  } else {
    // Resume with 3-second countdown
    pauseResumeBtn.disabled = true;
    let countdown = 3;
    timeDisplay.textContent = `Resuming in ${countdown}...`;

    countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        timeDisplay.textContent = `Resuming in ${countdown}...`;
      } else {
        clearInterval(countdownInterval);
        isPaused = false;
        pauseResumeBtn.textContent = 'Pause';
        pauseResumeBtn.disabled = false;
        updateTimeDisplay();
        clickBtn.disabled = false;
      }
    }, 1000);
  }
});

timerSelect.addEventListener('change', () => {
  // If game running, restart with new timer
  startGame();
});

// Start the game initially
startGame();
