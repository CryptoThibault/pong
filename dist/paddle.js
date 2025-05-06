export class Paddle {
    constructor(x, y, width, height, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
    }
    moveUp(canvasHeight) {
        if (this.y - this.speed >= 5) {
            this.y -= this.speed;
        }
        else {
            this.y = 5;
        }
    }
    moveDown(canvasHeight) {
        if (this.y + this.height + this.speed <= canvasHeight - 5) {
            this.y += this.speed;
        }
        else {
            this.y = canvasHeight - this.height - 5;
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    logPosition() {
        console.log(`Position du paddle : x = ${this.x}, y = ${this.y}`);
    }
}
