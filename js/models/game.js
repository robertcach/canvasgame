const OBSTACLE_FRAMES =  120
const FUELS_FRAMES =  360

class Game {
    constructor(ctx) {
        this.ctx = ctx;
  
        
        this.car = new Car(ctx, 575, 1050);
        this.background = new Background(ctx);
        this.puntuationBoder = new Puntuation(ctx);
        this.obstacles = []
        this.fuels = []

        this.intervalId = undefined
        this.fps = 1000 / 220

        this.obstacleFramesCount = 0
        this.fuelsFramesCount = 0

        this.score = 0
    }

    start() {
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {

          if (this.obstacleFramesCount % OBSTACLE_FRAMES === 0) {
            this.addObstacle();

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
      
          }, this.fps)
        }
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
        /* this.puntuationBoder.draw(); */
        this.obstacles.forEach(obstacle => obstacle.draw());
        this.fuels.forEach(fuel => fuel.draw());
        this.car.draw();

        this.drawScore()
      }

      drawScore() {
        this.ctx.save();
    
        this.ctx.fillStyle = 'white';
        this.ctx.font = ' bold 24px sans-serif';
    
        this.ctx.fillText(`Score: ${this.score} ptos`, 20, 40);
    
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
      }
    
      onKeyUp(keyCode) {
        this.car.onKeyUp(keyCode)
      }

      addObstacle() {
        const max = this.ctx.canvas.width - 150;
        const x = Math.floor(Math.random() * max);

        this.obstacles.push(new Obstacle(this.ctx, x, -150));
      }

      addFuel() {
        const max = this.ctx.canvas.width - 120;
        const x = Math.floor(Math.random() * max);

        this.fuels.push(new Fuel(this.ctx, x, 0));
      }


      setupListeners(event) {
        this.car.setupListeners(event)
      }

      checkCollissions() {
        const conditionObstacle = this.obstacles.some(obstacle => this.car.collidesWith(obstacle))
        const conditionFuel = this.fuels.some(fuel => this.car.collidesWith(fuel))
    
        if (conditionObstacle) {
          this.gameOver()
        }

        if (conditionFuel) {
          this.car.fuel += 10;
          this.continueGame()
          
        }
      }

      gameOver() {
        clearInterval(this.intervalId)
    
        this.ctx.save()
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.font = 'bold 25px sans-serif'
        this.ctx.fillText(`Game Over! Your final score: ${this.score}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)
    
        this.ctx.restore()
      }

      continueGame() {
        this.ctx.save()
    
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.font = 'bold 25px sans-serif'
        this.ctx.fillText(`You got more fuel`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)
    
        /* this.fuels.remove() */
        this.car.move()
        this.ctx.restore()  
      }

      whitOutFuel() {
        this.ctx.save();

        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.font = 'bold 25px sans-serif'
        this.ctx.fillText(`You got ${this.car.fuel}`, 90, 100)       
      }
}