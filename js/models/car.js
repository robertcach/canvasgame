class Car {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x 
        this.y = y 

        this.width = 50;
        this.height = 103;

        this.speed = 3;
        this.vx = 0;
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
        
            /* this.fuel -= 100;  */    
        /* this.tick++; */
        this.ctx.restore()
    }

    move() {  
      this.x += this.vx;

      if (this.x <= 0) {
        this.x = 0
      }
      if (this.x + this.width >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - this.width
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
    }
    
    onKeyUp(keyCode) {
      if (keyCode === KEY_RIGHT || keyCode === KEY_LEFT) {
        this.xFrame = 1;
        this.vx = 0;
      }
    }

      collidesWith(something) {
        if (
          this.y < something.y + something.height &&
          this.y + this.height > something.y &&
          this.x < something.x + something.width &&
          this.x + this.width > something.x 
        ) {
          return true
        }
    
        return false
      }

      
}