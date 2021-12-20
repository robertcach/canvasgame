class Car {
  constructor(ctx, x, y) {
      this.ctx = ctx;

      this.car = this.ctx.canvas.dataset.car
      
      this.carSelection = [
        {id: 0,
        src: '/images/cars/cars-0-sprite.png'
        },
        {
          id: 1,
          src: '/images/cars/cars-1-sprite.png'
        },
        {
          id: 2,
          src: '/images/cars/cars-2-sprite.png'
        },
        {
          id: 3,
          src: '/images/cars/cars-3-sprite.png'
        }
      ];

      this.x = x 
      this.y = y 

      this.width = 34;
      this.height = 70;

      this.speed = 2;
      this.turbo = 5;
      this.vx = 0;
      this.vy = 0;
      this.fuel = 100;
      this.missile = 0;

      this.img = new Image();
      
      this.img.src = this.carSelection[this.car].src,
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
          
      this.ctx.restore()
  }

  move() {  
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= MAX_LEFT) {
      this.x = MAX_LEFT;
    }

    if (this.x >= MAX_RIGHT) {
      this.x = MAX_RIGHT;
    }
    
    if (this.y >= 650) {
      this.y = 650;
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

    collidesWithMissile(missile) {
      if (
        this.y < missile.y + missile.height &&
        this.y + this.height > missile.y &&
        this.x < missile.x + missile.width &&
        this.x + this.width > missile.x 
      ) {
        return true
      }
  
      return false
    }
    
}