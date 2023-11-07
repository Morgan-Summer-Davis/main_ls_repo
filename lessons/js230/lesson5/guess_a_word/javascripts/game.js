let randomWord = (function randomWord() {
  let words       = ['APPLE', 'BANANA', 'ORANGE', 'PEAR'];

  return function() {
    let randomIndex = Math.floor(Math.random() * words.length);
    return words.splice(randomIndex, 1)[0];
  }
})();

document.addEventListener('DOMContentLoaded', event => {
  let wordDisplay  = document.getElementById('wordDisplay');
  let guessDisplay = document.getElementById('guessDisplay');
  let message      = document.getElementById('message');
  let replay       = document.getElementById('replay');
  let apples       = document.getElementById('apples');

  class Game {
    static #keydownEvent = event => game.guess(event.key.toUpperCase());

    constructor() {
      this.startNewGame();
    }

    startNewGame() {
      this.word           = randomWord();
      this.incorrect      = 0;
      this.guesses        = [];
      this.allowedGuesses = 6;
      this.letters        = this.word ? new Array(this.word.length).fill('_') : undefined;

      message.textContent  = '';
      replay.style.display = 'none';
      apples.className     = ''
      document.body.classList.remove('win');
      document.body.classList.remove('lose');
      document.addEventListener('keydown', Game.#keydownEvent);

      this.#drawLetters();
    }

    #drawLetters() {
      wordDisplay.textContent = this.letters ? this.letters.join('') : "Sorry, I've run out of words!";
      guessDisplay.textContent = this.guesses.join('');
    }

    guess(char) {
      if (!/^[A-Z]$/.test(char) || this.guesses.includes(char)) return;

      this.guesses.push(char);
      let validGuess = this.#checkGuess(char);

      if (validGuess) {
        validGuess.forEach(i => this.letters[i] = char);
      } else {
        this.incorrect++;
        apples.classList.add(`guess_${this.incorrect}`);
      }

      this.#drawLetters();
      if (!this.letters.includes('_') || this.incorrect >= this.allowedGuesses) {
        this.#gameDone();
      }
    }

    #checkGuess(char) {
      let indexes = [];
      this.word.split('').forEach((letter, i) => { if (char === letter) indexes.push(i)});

      return indexes.length > 0 ? indexes : false;
    }

    #gameDone() {
      console.log('uh?');
      if (this.incorrect >= this.allowedGuesses) this.#lose();
      else                                       this.#win();

      replay.style.display = 'inline';
      document.removeEventListener('keydown', Game.#keydownEvent);
    }

    #lose() {
      console.log('hm');
      message.textContent = "Sorry! You're out of guesses";
      document.body.classList.add('lose');
    }

    #win() {
      console.log('mh');
      message.textContent = "You won!";
      document.body.classList.add('win');
    }
  }

  let game = new Game();
  replay.addEventListener('click', event => {
    event.preventDefault();
    game.startNewGame()
  });
});