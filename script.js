const wordEl = document.getElementById('word'),
  wrongLettersEl = document.getElementById('wrong-letters'),
  playAgainBtn = document.getElementById('play-button'),
  popup = document.getElementById('popup-container'),
  notification = document.getElementById('notification-container'),
  finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['apple', 'computer', 'ginger', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// SHOW HIDDEN WORD
function displayWord() {
  wordEl.innerHTML = `
 ${selectedWord
   .split('')
   .map(
     (letter) => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ''}
      </span>`
   )
   .join('')}
 `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You WON!';
    popup.style.display = 'flex';
  }
}

// UPDATE THE WRONG LETTERS
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => ` <span>${letter}</span>`)}
  `;

  // DISPLAY PARTS
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // CHECK IF LOST
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'You LOST!';
    popup.style.display = 'flex';
  }
}

// SHOW NOTIFICATION
function showNotifications() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2500);
}

// KEYDOWN LETTER PRESS
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotifications();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotifications();
      }
    }
  }
});

// RESTART GAME AND PLAY AGAIN
playAgainBtn.addEventListener('click', () => {
  // Empty Array
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();
