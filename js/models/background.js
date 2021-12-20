class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.circuit = this.ctx.canvas.dataset.background

        this.y = 0;
        this.vy = 4

        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height

        this.circuitSelection = [
            {id: 0,
            src: '/images/circuits/background-race-0.jpg'
            },
            {
              id: 1,
              src: '/images/circuits/background-race-1.jpg'
            }
          ];

        this.img = new Image();
        this.img.src = this.circuitSelection[this.circuit].src;

        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }
    }

    draw() {

        if(this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                0,
                this.y,
                this.width ,
                this.height,
            )
            this.ctx.drawImage(
                this.img,
                0,
                this.y - this.height,
                this.width ,
                this.height,
            )
        }  
    }

    move() {
        this.y += this.vy
    
        if (this.y - this.height >= 0) {
          this.y = 0
        }
      }
}