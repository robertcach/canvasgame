const canvas = document.getElementById('canvas');
const canvasBoard = document.getElementById('game-board')
const canvasImage = document.getElementById('game-intro')
const ctx = canvas.getContext('2d');




window.onload = () => {
  /* mainMenu = new Audio('/sounds/first-capture-background-sound.mp3');
  mainMenu.volume = 0.5;
  mainMenu.play(); */

  

  document.getElementById('start-button').onclick = () => {
    canvasImage.style.display = 'none';
    canvasBoard.style.display = 'block';
    
    startGame();
    /* mainMenu.pause(); */
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


