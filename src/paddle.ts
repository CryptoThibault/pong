import { canvas, ctx } from "./state.js"

export class Paddle {
    constructor(
      public x: number,
      public y: number,
      public width: number,
      public height: number,
      public speed: number,
      public color: string
    ) {}

    moveUp(): void {
      if (this.y - this.speed >= 5) {
        this.y -= this.speed;
      } else {
        this.y = 5;
      }
    }
  
    moveDown(): void {
      if (this.y + this.height + this.speed <= canvas.height - 5) {
        this.y += this.speed;
      } else {
        this.y = canvas.height - this.height - 5;
      }
    }
  
    draw(): void {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    logPosition(): void {
      console.log(`Paddle position : x = ${this.x}, y = ${this.y}`);
    }
  }
  