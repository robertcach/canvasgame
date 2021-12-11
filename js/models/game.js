const OBSTACLE_FRAMES =  120
const FUELS_FRAMES =  480

const canvasButtons= document.getElementById('restart-button');

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.carSelection = this.ctx.canvas.dataset.car || 0;
        
        this.car = new Car(ctx, 575, 1050, );
        this.background = new Background(ctx);
        this.puntuationBoder = new Puntuation(ctx);
        this.obstacles = []
        this.fuels = []

        this.intervalId = undefined
        this.fps = 1000 / 220

        this.obstacleFramesCount = 0
        this.fuelsFramesCount = 0

        this.score = 0;
        
        this.raceBegin = new Audio('/sounds/race-background-sound.mp3');
        this.raceBegin.volume = 0.3;

        this.driftSound = new Audio('/sounds/drift.mp3');
        this.driftSound.volume = 0.2;

        this.pickUpFuel = new Audio('/sounds/pick-up-fuel.wav');
        this.pickUpFuel.volume = 0.3;

        this.carCrash = new Audio('/sounds/car-crash.wav');
        this.carCrash.volume = 0.2;      
    }

      start() {
        if (!this.intervalId) {
          this.intervalId = setInterval(() => {
            

            if (this.obstacleFramesCount % OBSTACLE_FRAMES === 0) {
              this.addObstacle();
              this.car.fuel -= 2;
              
              this.obstacleFramesCount = 0 
            }

            if (this.fuelsFramesCount % FUELS_FRAMES === 0) {
              this.addFuel();

              this.fuelsFramesCount = 0
            }

            this.clear()

            this.move()

            this.draw()

            this.whitOutFuel()
            this.checkCollissions()        
            
            this.obstacleFramesCount++
            this.fuelsFramesCount++

            

            if (this.car.fuel <= 0) {
              this.gameOver();
            }

            }, this.fps)
          }

          this.raceBegin.currentTime = 0;
          this.raceBegin.play();
      }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        const previousObstaclesLength = this.obstacles.length;

        this.obstacles = this.obstacles.filter(obstacle => obstacle.y - obstacle.height < 1300)

        if (this.obstacles.length < previousObstaclesLength) {
          this.score++
        }
      }
    
      draw() {
        this.background.draw();
        
        this.obstacles.forEach(obstacle => obstacle.draw());
        this.fuels.forEach(fuel => fuel.draw());
        this.car.draw();
        this.puntuationBoder.draw();
        this.drawScore()
      }

      drawScore() {
        this.ctx.save();
    
        this.ctx.fillStyle = 'black';
        this.ctx.font = ' bold 32px sans-serif';
    
        this.ctx.fillText(`${this.score}`, 50, 80);
    
        this.ctx.restore();
      }

      move() {
        this.obstacles.forEach(obstacle => obstacle.move()); 
        this.fuels.forEach(fuel => fuel.move());
        this.car.move();
        this.background.move();        
      }

      onKeyDown(keyCode) {
        this.car.onKeyDown(keyCode)
        this.driftSound.currentTime = 0
        this.driftSound.play();
      }
    
      onKeyUp(keyCode) {
        this.car.onKeyUp(keyCode)
      }

      addObstacle() {
        const xObstacle = Math.floor(Math.random() * (MAX_LEFT - MAX_RIGHT + 1) + MAX_RIGHT);

        this.obstacles.push(new Obstacle(this.ctx, xObstacle, -150));
      }

      addFuel() {
        const xFuel = Math.floor(Math.random() * (MAX_LEFT - MAX_RIGHT + 1) + MAX_RIGHT);

        this.fuels.push(new Fuel(this.ctx, xFuel, 0));
      }


      setupListeners(event) {
        this.car.setupListeners(event)
      }

      checkCollissions() {
        const conditionObstacle = this.obstacles.some(obstacle => this.car.collidesWithObstacle(obstacle));

        const conditionFuel = this.fuels.find(fuel => this.car.collidesWithFuel(fuel));
    
        if (conditionObstacle) {
          this.carCrash.currentTime = 0;
          this.carCrash.play();
          this.gameOver();
        }

        if (conditionFuel) {
          this.pickUpFuel.currentTime = 0;
          this.pickUpFuel.play();
          

          this.fuels = this.fuels.filter(fuel => fuel !== conditionFuel)
          this.car.fuel += 10;
          this.continueGame();      
        }
      }

      gameOver() {
        clearInterval(this.intervalId)
    
        this.ctx.save();
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.font = 'bold 25px sans-serif'
        this.ctx.fillText(`Game Over! Your final score: ${this.score}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)

        canvasButtons.classList.add('display-important')
        canvasButtons.addEventListener("click", () => location.reload());
        

        this.raceBegin.pause();
        this.driftSound.volume = 0;
        this.ctx.restore();
      }

      continueGame() {
        this.ctx.save()

        this.car.move()
        this.ctx.restore()  
      }

      whitOutFuel() {
        this.ctx.save();

        this.ctx.fillStyle = 'black'
        this.ctx.textAlign = 'center'
        this.ctx.font = 'bold 32px sans-serif'
        this.ctx.fillText(`${this.car.fuel}%`, 1090, 1135);
      }
}