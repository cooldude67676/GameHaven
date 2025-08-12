const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let velocity = { x: 1, y: 0 }; // Start moving right
let apple = { x: 5, y: 5 };
let gameOver = false;
let score = 0;

restartBtn.addEventListener('click', () => {
  resetGame();
});

document.addEventListener('keydown', (e) => {
  // Prevent arrow keys from scrolling the page
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }

  switch (e.key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      if (velocity.y === 1) break;
      velocity = { x: 0, y: -1 };
      break;
    case 'arrowdown':
    case 's':
      if (velocity.y === -1) break;
      velocity = { x: 0, y: 1 };
      break;
    case 'arrowleft':
    case 'a':
      if (velocity.x === 1) break;
      velocity = { x: -1, y: 0 };
      break;
    case 'arrowright':
    case 'd':
      if (velocity.x === -1) break;
      velocity = { x: 1, y: 0 };
      break;
  }
});

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', 120, 200);
    ctx.font = '20px Arial';
    ctx.fillText('Use Restart button to play again', 70, 230);
    restartBtn.style.display = 'inline-block';
    return;
  }

  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount
  ) {
    gameOver = true;
  }

  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      gameOver = true;
    }
  }

  if (gameOver) {
    gameLoop();
    return;
  }

  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    placeApple();
  } else {
    snake.pop();
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

  ctx.fillStyle = 'lime';
  for (let segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  }
}

function placeApple() {
  apple.x = Math.floor(Math.random() * tileCount);
  apple.y = Math.floor(Math.random() * tileCount);

  for (let segment of snake) {
    if (segment.x === apple.x && segment.y === apple.y) {
      placeApple();
      break;
    }
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 1, y: 0 };
  gameOver = false;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  restartBtn.style.display = 'none';
  placeApple();
}

placeApple();
setInterval(gameLoop, 100);
