const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let cubeY = 200;
let cubeVelocity = 0;
const gravity = 0.5;
const lift = -8;

let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

document.addEventListener("keydown", () => {
  if (!gameOver) cubeVelocity = lift;
  else location.reload(); // Restart on key press if game over
});

function drawCube() {
  ctx.fillStyle = "#ff3333";
  ctx.fillRect(100, cubeY, 30, 30);
}

function drawPipes() {
  ctx.fillStyle = "#009900";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  });
}

function updatePipes() {
  if (frame % 90 === 0) {
    const pipeTop = Math.floor(Math.random() * 200) + 50;
    const gap = 120;
    pipes.push({
      x: canvas.width,
      width: 50,
      top: pipeTop,
      bottom: canvas.height - pipeTop - gap
    });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    // Collision detection
    if (
      100 + 30 > pipe.x &&
      100 < pipe.x + pipe.width &&
      (cubeY < pipe.top || cubeY + 30 > canvas.height - pipe.bottom)
    ) {
      gameOver = true;
    }

    // Score
    if (pipe.x + pipe.width === 100) {
      score++;
    }
  });

  // Remove off-screen pipes
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "20px sans-serif";
  ctx.fillText("Score: " + score, 10, 25);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    cubeVelocity += gravity;
    cubeY += cubeVelocity;

    if (cubeY + 30 > canvas.height || cubeY < 0) {
      gameOver = true;
    }

    updatePipes();
  }

  drawCube();
  drawPipes();
  drawScore();

  if (gameOver) {
    ctx.fillStyle = "#fff";
    ctx.font = "30px sans-serif";
    ctx.fillText("Game Over", 120, 250);
    ctx.font = "20px sans-serif";
    ctx.fillText("Press any key to restart", 100, 290);
  }

  frame++;
  requestAnimationFrame(gameLoop);
}

gameLoop();
