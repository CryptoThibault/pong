export class Paddle {
    constructor(
      public x: number,
      public y: number,
      public width: number,
      public height: number,
      public speed: number,
      public color: string
    ) {}

    moveUp(canvasHeight: number): void {
      if (this.y - this.speed >= 5) {
        this.y -= this.speed;
      } else {
        this.y = 5;
      }
    }
  
    moveDown(canvasHeight: number): void {
      if (this.y + this.height + this.speed <= canvasHeight - 5) {
        this.y += this.speed;
      } else {
        this.y = canvasHeight - this.height - 5;
      }
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    logPosition(): void {
      console.log(`Position du paddle : x = ${this.x}, y = ${this.y}`);
    }
  }
  