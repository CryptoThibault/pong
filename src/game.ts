import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js"

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let isRunning: boolean = true;

const ball = new Ball(250, 250, 15, 1, 2, 1, "white");

const paddleWidth = 10;
const paddleHeight = 100;
const leftPaddle = new Paddle(5, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, 10, "white");
const rightPaddle = new Paddle(canvas.width - paddleWidth - 5, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, 10, "white");

function updateGame() {
    ball.move(canvas.width, canvas.height);
    //ball.logPosition();
    //leftPaddle.logPosition();
    //rightPaddle.logPosition();
}

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw(ctx);
    leftPaddle.draw(ctx);
    rightPaddle.draw(ctx);
}

function renderPauseMenu() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 3);
    ctx.fillText("Press ENTER to Resume", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Press X to Quit", canvas.width / 2, canvas.height / 1.5);
}

function gameLoop() {
    if (!isRunning) return;
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}

function togglePause() {
    isRunning = !isRunning;

    if (isRunning)
        requestAnimationFrame(gameLoop);
    else
        renderPauseMenu();
}

function quitGame() {
    window.location.reload();
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") togglePause();
    if (isRunning) {
        if (event.key === "w") leftPaddle.moveUp(canvas.height);
        if (event.key === "s") leftPaddle.moveDown(canvas.height);
        if (event.key === "o") rightPaddle.moveUp(canvas.height);
        if (event.key === "l") rightPaddle.moveDown(canvas.height);
    } else {
        if (event.key === "Enter") togglePause(); 
        if (event.key === "x") quitGame();
    }
});

gameLoop();