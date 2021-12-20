const OBSTACLE_FRAMES =  120
const FUELS_FRAMES =  480
const MISSILES_FRAMES =  480

const canvasButtons= document.getElementById('restart-button');

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.carSelection = this.ctx.canvas.dataset.car || 0;
        
        this.car = new Car(ctx, 575, 600);
        this.background = new Background(ctx);
        this.puntuationBoder = new Puntuation(ctx);
        this.obstacles = [];
        this.fuels = [];
        this.missiles = [];
        this.bullets = [];

        this.intervalId = undefined
        this.fps = 1000 / 220

        this.obstacleFramesCount = 0
        this.fuelsFramesCount = 0
        this.missileFramesCount = 0

        this.score = 0;
        
        this.raceBegin = new Audio('/sounds/race-background-sound.mp3');
        this.raceBegin.volume = 0.3;

        this.driftSound = new Audio('/sounds/drift.mp3');
        this.driftSound.volume = 0.2;

        this.pickUpFuel = new Audio('/sounds/pick-up-fuel.wav');
        this.pickUpFuel.volume = 0.3;

        this.carCrash = new Audio('/sounds/car-crash.wav');
        this.carCrash.volume = 0.2;

        this.launchMissile = new Audio('/sounds/launch-missile.mp3');
        this.launchMissile.volume = 0.4;

        this.finishGame = new Audio('/sounds/game-over.mp3');
        this.finishGame.volume = 0.4;
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

            if (this.missileFramesCount % MISSILES_FRAMES === 0) {
              this.addMissile();

              this.missileFramesCount = 0
            }

            this.clear()

            this.move()

            this.draw()

            this.whitOutFuel()
            this.checkCollissions() 
            
            this.obstacleFramesCount++
            this.fuelsFramesCount++
            this.missileFramesCount++

            if (this.car.fuel <= 0) {
              this.finishGame.play();
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

        this.missiles = this.missiles.filter(missile => missile.y - missile.height < 1300)

        this.bullets = this.bullets.filter(bullet => bullet.y - bullet.height < 1300)
      }
    
      draw() {
        this.background.draw();
        
        this.missiles.forEach(missile => missile.draw());
        
        this.fuels.forEach(fuel => fuel.draw());
        this.obstacles.forEach(obstacle => obstacle.draw());
        this.car.draw();
        this.bullets.forEach(missile => missile.draw());
        this.puntuationBoder.draw();
        this.drawScore();
      }

      drawScore() {
        this.ctx.save();
    
        this.ctx.fillStyle = 'black';
        this.ctx.font = ' bold 28px sans-serif';
    
        this.ctx.fillText(`${this.score}`, 30, 80);
    
        this.ctx.restore();
      }

      move() {
        this.missiles.forEach(missile => missile.move());
        this.fuels.forEach(fuel => fuel.move());
        this.bullets.forEach(missile => missile.send());
        this.obstacles.forEach(obstacle => obstacle.move());
        this.car.move();
        this.background.move();        
      }

      onKeyDown(keyCode) {
        this.car.onKeyDown(keyCode);
        this.driftSound.currentTime = 0;
        this.driftSound.play();
      }
    
      onKeyUp(keyCode) {
        this.car.onKeyUp(keyCode);
      }


      addObstacle() {
        const xObstacle = Math.floor(Math.random() * (MAX_LEFT - MAX_RIGHT + 1) + MAX_RIGHT);

        this.obstacles.push(new Obstacle(this.ctx, xObstacle, -150));
      }

      addFuel() {
        const xFuel = Math.floor(Math.random() * (MAX_LEFT - MAX_RIGHT + 1) + MAX_RIGHT);

        this.fuels.push(new Fuel(this.ctx, xFuel, 0));
      }

      addMissile() {
        const xMissile = Math.floor(Math.random() * (MAX_LEFT - MAX_RIGHT + 1) + MAX_RIGHT);

        this.missiles.push(new Missile(this.ctx, xMissile, -150));
      }

      setupListeners(event) {
        this.car.setupListeners(event)
      }

      checkCollissions() {
        const conditionObstacle = this.obstacles.some(obstacle => this.car.collidesWithObstacle(obstacle));
    
        if (conditionObstacle) {
          this.carCrash.currentTime = 0;
          this.carCrash.play();
          this.gameOver();
        }

        const conditionFuel = this.fuels.find(fuel => this.car.collidesWithFuel(fuel));

        if (conditionFuel) {
          this.pickUpFuel.currentTime = 0;
          this.pickUpFuel.play();

          this.fuels = this.fuels.filter(fuel => fuel !== conditionFuel)
          this.car.fuel += 10;

          if (this.car.fuel >= 100) {
            this.car.fuel = 100;
          }
          this.continueGame();      
        }

        const conditionMissile = this.missiles.find(missile => this.car.collidesWithMissile(missile));

        if (conditionMissile) {
         this.missiles = this.missiles.filter(missile => missile !== conditionMissile);

        this.bullets.push(new Missile(this.ctx, this.car.x, 700));
        this.launchMissile.play();  
        }

        
        this.bullets.forEach((bullet, bulletIndex) => {
          this.obstacles.forEach((obstacle, obstacleIndex) => {
            const collision = bullet.collidesWithObstacle(obstacle);
            if(collision) {
              this.obstacles.splice(obstacleIndex, 1);

              setTimeout(() => {
                this.bullets.splice(bulletIndex, 1);
              }, 75)
              
            }
          })
        })
      }

      
      gameOver() {
        clearInterval(this.intervalId)
    
        this.ctx.save();
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.font = 'bold 25px sans-serif'
        this.ctx.fillText(`Game Over! Your final score: ${this.score}`, this.ctx.canvas.width / 2, 300)

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
        this.ctx.font = 'bold 28px sans-serif'
        this.ctx.fillText(`${this.car.fuel}%`, 1440, 685);
      }
}