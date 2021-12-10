/* import {carToGame} from "../models/choose-car-circuit.js"; */

class Car {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x 
        this.y = y 

        this.width = 50;
        this.height = 103;

        this.speed = 3;
        this.vx = 0;
        this.vy = 0;
        this.fuel = 500;

        this.img = new Image();
        
        this.img.src = '../images/cars/police-cars-sprite.png',
        this.img.isReady = false;

        this.img.onload = () => {
        this.img.isReady = true
        }

        this.horizontalFrames = 3;
        this.verticalFrames = 1;

        this.xFrame = 1;
        this.yFrame = 0;

        this.tick = 0

        this.movements = {
            up: false,
            down: false,
            left: false,
            right: false
          }       
    }

    draw() {
            this.ctx.drawImage(
              this.img,
              (this.img.width * this.xFrame) / this.horizontalFrames,
              (this.img.height * this.yFrame) / this.verticalFrames,
              this.img.width / this.horizontalFrames,
              this.img.height / this.verticalFrames,
              this.x,
              this.y,
              this.width,
              this.height,
            )

        /* this.tick++; */
        this.ctx.restore()
    }

    move() {  
      this.x += this.vx;
      this.y += this.vy;

      if (this.x <= 0) {
        this.x = 0;
      }

      if (this.x + this.width >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - this.width;
      }
      
      if (this.y >= 1050) {
        this.y = 1050;
      }

      if (this.y <= 0) {
        this.y = 0;
      }
    }

    onKeyDown(keyCode) {
      if (keyCode === KEY_RIGHT) {
        this.vx = this.speed;
        this.xFrame = 2;
        
      }
  
      if (keyCode === KEY_LEFT) {
        this.vx -= this.speed;
        this.xFrame = 0;
      }

      if (keyCode === KEY_UP) {
        this.vy -= this.speed;
        this.xFrame = 2;
      }

      if (keyCode === KEY_DOWN) {
        this.vy = this.speed;
        this.xFrame = 0;
      }


    }
    
    onKeyUp(keyCode) {
      if (keyCode === KEY_RIGHT || keyCode === KEY_LEFT) {
        this.xFrame = 1;
        this.vx = 0;
      }

      if (keyCode === KEY_UP || keyCode === KEY_DOWN) {
        this.xFrame = 1;
        this.vy = 0;
      }
    }

      collidesWithObstacle(obstacle) {
        if (
          this.y < obstacle.y + obstacle.height &&
          this.y + this.height > obstacle.y &&
          this.x < obstacle.x + obstacle.width &&
          this.x + this.width > obstacle.x 
        ) {
          return true
        }
    
        return false
      }

      collidesWithFuel(fuel) {
        if (
          this.y < fuel.y + fuel.height &&
          this.y + this.height > fuel.y &&
          this.x < fuel.x + fuel.width &&
          this.x + this.width > fuel.x 
        ) {
          return true
        }
    
        return false
      }
      
}