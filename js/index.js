const canvas = document.getElementById('canvas');
const canvasBoard = document.getElementById('game-board')
const firstCapture = document.getElementById('game-intro')
const ctx = canvas.getContext('2d');




window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    firstCapture.style.display = 'none';
    canvasBoard.style.display = 'flex';
    canvasBoard.style.justifyContent = 'center';
    canvasBoard.style.alignItems = 'center';
    canvasBoard.style.height = '100vh';
    
    startGame();
  };

  function startGame () {
    const game = new Game(ctx)
    game.start();

    window.addEventListener('keydown', (event) => {
      game.onKeyDown(event.keyCode)
    })
  
    window.addEventListener('keyup', (event) => {
      game.onKeyUp(event.keyCode)
    })
  }
};


