let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}*/

let playerPickMove = '';
let computerMove = '';
let result = '';

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`;
};

function updateUserMove() {
  document.querySelector('.js-usermove-computermove')
    .innerHTML = `You <img class="move-icon" src="img/${playerPickMove}-emoji.png" alt="">  <img class="move-icon" src="img/${computerMove}-emoji.png" alt=""> Computer`;
};

function updateResult() {
  document.querySelector('.js-result')
    .innerHTML = result;
};

function resetUserMoveAndResult() {
  document.querySelector('.js-result')
    .innerHTML = '';
}

updateScoreElement();
updateResult();

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {playGame('rock');});
document.querySelector('.js-paper-button').addEventListener('click', () => {playGame('paper');});
document.querySelector('.js-scissors-button').addEventListener('click', () => {playGame('scissors');});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  };
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  result = '';
  if (playerMove === 'rock') {
    playerPickMove = 'rock';
    if (computerMove === 'rock') {
    result = 'Tie.';
    } else if (computerMove === 'paper') {
    result = 'You lose.';
    } else if (computerMove === 'scissors') {
    result = 'You win.';
    };
  } else if (playerMove === 'paper') {
    playerPickMove = 'paper';
      if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    };
  } else if (playerMove === 'scissors') {
    playerPickMove = 'scissors';
      if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  };

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  updateUserMove();
  updateResult();
  /*alert(`You ${playerMove}. Computer ${computerMove}. ${result}
  Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}
  `);*/
};

let intervalID;
let isAutoPlay = false;

function autoPlay() {
  if (!isAutoPlay) {
    intervalID = setInterval(function() {
    const playerMove = pickComputerMove();
    playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
  } else {
    clearInterval(intervalID);
    isAutoPlay = false;
  };
};
