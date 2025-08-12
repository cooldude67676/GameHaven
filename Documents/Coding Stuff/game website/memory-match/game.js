const symbols = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉'];
let shuffledSymbols = [];
let flippedCards = [];
let matchedCount = 0;

const board = document.getElementById('game-board');

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function createBoard() {
  shuffledSymbols = shuffle([...symbols]);
  shuffledSymbols.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = symbol;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (
    flippedCards.length < 2 &&
    !card.classList.contains('flipped') &&
    !card.locked
  ) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.textContent === card2.textContent) {
    card1.locked = true;
    card2.locked = true;
    matchedCount += 2;
    flippedCards = [];

    if (matchedCount === symbols.length) {
      setTimeout(() => alert('You won! 🎉'), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

createBoard();
