// PLAYER MOVEMENT/jogo só inicia/função só é chamada depois de cada clique
document.querySelector('#pedra').onclick = function() {
  playGame('pedra')
};
document.querySelector('#papel').onclick = function() {
  playGame('papel')
};
document.querySelector('#tesoura').onclick = function() {
  playGame('tesoura')
};

let result
let score = JSON.parse(localStorage.getItem('score')) || {win: 0, lose: 0, tie:0};

// FAZ JOGO FUNCIONAR/comparação entre jogadas
function playGame(playerMove) {
  const computerMove = pickComputerMove()

  if (playerMove === computerMove) {
    result = 'tie'

  } else if ((playerMove === 'pedra' && computerMove == 'tesoura') || 
  (playerMove === 'tesoura' && computerMove === 'papel') ||
  (playerMove === 'papel' && computerMove === 'pedra')) {
    result = 'win'

  } else {
    result = 'lose'
  }

  if (result === 'win') {
    score.win += 1
  } else if (result === 'lose') {
    score.lose += 1
  } else if (result === 'tie') {
    score.tie += 1
  }

  localStorage.setItem('score', JSON.stringify(score));
  exibirResultado()

// EXIBE RESULTADO
  if (result === 'win') {
    document.querySelector('#js-resultado').innerHTML = 'Win'
  } else if (result === 'lose') {
    document.querySelector('#js-resultado').innerHTML = 'Lose'
  } else if (result === 'tie') {
    document.querySelector('#js-resultado').innerHTML = 'Tie'
  }

// EXIBE MOVIMENTOS PLAYER/COMPUTADOR
    document.querySelector('#js-moves').innerHTML = `
  <p>You: <img src="img/${playerMove}-emoji.png" alt="${playerMove}"></p>
  <p>Computer: <img src="img/${computerMove}-emoji.png" alt="${computerMove}"></p>`;
}

// DEFINE MOVIMENTO DO COMPUTADOR/comparação entre intervalos de 0 à 1
let computerMove

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1/3) {
    return 'pedra';

  } else if (1/3 <= randomNumber && randomNumber < 2/3) {
    return 'papel'

  } else {
    return 'tesoura'
  }
};

// EXIBE SCORE
function exibirResultado() {
  const resultado = document.querySelector('#js-score').innerHTML = `Wins: ${score.win} Loses: ${score.lose} Ties: ${score.tie}`;
}

// RESETA O SCORE
document.querySelector('#js-reset-score').onclick = function() {
  score.win = 0;
  score.lose = 0;
  score.tie = 0
  exibirResultado()
};
exibirResultado()
