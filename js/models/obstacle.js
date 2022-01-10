class Obstacle {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y
        
        this.width = 35
        this.height = 72

        this.vy = -3

        this.img = new Image();
        this.img.src = './images/cars/osbtacle.png', 
        this.img.isReady = false;

        this.img.onload = () => {
        this.img.isReady = true
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
        this.y -= this.vy
    }
}