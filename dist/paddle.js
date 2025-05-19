import { canvas, ctx } from "./state.js";
export class Paddle {
    constructor(x, y, width, height, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
    }
    moveUp() {
        if (this.y - this.speed >= 5) {
            this.y -= this.speed;
        }
        else {
            this.y = 5;
        }
    }
    moveDown() {
        if (this.y + this.height + this.speed <= canvas.height - 5) {
            this.y += this.speed;
        }
        else {
            this.y = canvas.height - this.height - 5;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    logPosition() {
        console.log(`Paddle position : x = ${this.x}, y = ${this.y}`);
    }
}
