'use strict';
let btnNewEL = document.querySelector('.btn--new');
let btnRollEL = document.querySelector('.btn--roll');
let btnHoldEL = document.querySelector('.btn--hold');
let diceEL = document.querySelector('.dice');
let current0EL = document.querySelector('#current--0');
let current1EL = document.querySelector('#current--1');
let player0EL = document.querySelector('.player--0');
let player1EL = document.querySelector('.player--1');
let score0EL = document.querySelector('#score--0');
let score1EL = document.querySelector('#score--1');
let currentNumber = 0;
let player = 0;
let score = [0, 0];
//!添加開始判斷
let playing = 0;

//*交換玩家
function switchPlayer() {
  document.querySelector(`.player--${player}`).classList.toggle('player--active');
  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.toggle('player--active');
}

function curScorePrint() {
  document.querySelector(`#current--${player}`).textContent = currentNumber;
}

function playerScorePrint() {
  document.querySelector(`#score--${player}`).textContent = score[player];
}
function newGame() {
  player = 0;
  score = [0, 0];
  currentNumber = 0;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  diceEL.classList.remove('appear');
  for (let i = 0; i < 2; i++) {
    player = i;
    curScorePrint();
    playerScorePrint();
  }
  player = 0;
  btnRollEL.addEventListener('click', rollDice);
  btnHoldEL.addEventListener('click', pressHold);
  playing = 1;
}

function rollDice() {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceEL.src = `dice-${diceNumber}.png`;
    diceEL.classList.add('appear');
    //*Check dice = 1 or not
    if (diceNumber !== 1) {
      currentNumber += diceNumber;
      curScorePrint();
    } else {
      currentNumber = 0;
      curScorePrint();
      switchPlayer();
    }
  }
}
function pressHold() {
  if (playing) {
    score[player] += currentNumber;
    playerScorePrint();
    currentNumber = 0;
    curScorePrint();
    if (score[0] >= 100) {
      player = 0;
      win();
    } else if (score[1] >= 100) {
      player = 1;
      win();
    } else {
      switchPlayer();
    }
  }
}
function win() {
  document.querySelector(`.player--${player}`).classList.add('player--winner');
  playing = 0;
}

btnNewEL.addEventListener('click', newGame);
btnRollEL.addEventListener('click', rollDice);
btnHoldEL.addEventListener('click', pressHold);
newGame();
