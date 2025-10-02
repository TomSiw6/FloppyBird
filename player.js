const sprite1 = new Image();
sprite1.src = 'znicz1.png'
const sprite2 = new Image();
sprite2.src = 'znicz2.png'

class Player {
    constructor() {
        this.x = 50;
        this.y = 250;
        this.vy = 0;
        this.width = 100;
        this.height = 50;
        this.weight = 0.05;
    }
    update() {
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.vy = 0;
        } else if(this.y < 0) {
            this.y = 0;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.y += this.vy;
        }
        if (spacePressed) this.flap();
    }
    draw() {
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(sprite1, this.x, this.y, this.width, this.height);
    }
    flap() {
        if (Collisions()) {
            this.vy = 0;
        }
        else {
            this.vy = -2;
        }
    }
}
const player = new Player();