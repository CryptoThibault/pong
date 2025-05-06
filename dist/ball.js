import scoreGoal from "./game.js";
export class Ball {
    constructor(x, y, radius, dx, dy, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.color = color;
    }
    move(canvasWidth, canvasHeight) {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        if (this.x - this.radius < 0) {
            scoreGoal(0);
        }
        if (this.x + this.radius > canvasWidth) {
            scoreGoal(1);
        }
        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    logPosition() {
        console.log(`Position de la balle : x = ${this.x}, y = ${this.y}`);
    }
}
