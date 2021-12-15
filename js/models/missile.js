class Missile {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.width = 22;
        this.height = 85;

        this.speed = 40;
        this.vy = -3;

        this.img = new Image();
        this.img.src = '../images/missile.png'
        this.img.isReady = false;

        this.img.onload = () => {
            this.img.isReady = true
        }

        this.movements = {
            space: false,
        }
    }

    draw() {
        this.ctx.save()

        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height,
            )
        }

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
          return true
        }
    
        return false
      }
}