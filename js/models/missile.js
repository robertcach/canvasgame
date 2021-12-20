class Missile {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.width = 34;
        this.height = 52;

        this.speed = 40;
        this.vy = -3;

        this.img = new Image();
        this.img.src = '/images/missile-explosion.png'
        this.img.isReady = false;

        this.img.onload = () => {
            this.img.isReady = true
        }

        this.horizontalFrames = 1;
        this.verticalFrames = 2;

        this.xFrame = 0;
        this.yFrame = 0;

        this.movements = {
            space: false,
        }
    }

    draw() {
        this.ctx.save()
        
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
        this.y -= this.vy;
    }

    send() {
        this.y += this.vy;
      }

    onKeyDownSpace(keyCode) {
        if (keyCode === SPACE_KEY) {
            this.vy += this.speed;
        }
    }

    onKeyUpSpace(keyCode) {
        if (keyCode === SPACE_KEY) {
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
        
        console.log("Boom");
        this.yFrame = 1;
        return true
 
        }
    
        return false
      }
}