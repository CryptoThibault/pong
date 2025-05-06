import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js"

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let isRunning: boolean = true;

let scores = {left: 0, right: 0};

const dxStart = Math.floor(Math.random() * 2) ? -1 : 1;
const ball = new Ball(canvas.width / 2, canvas.height / 2, 5, dxStart, 0, 5, "white");

const paddleWidth = canvas.width * 0.01;
const paddleHeight = canvas.height * 0.15
const leftPaddle = new Paddle(5, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, 10, "white");
const rightPaddle = new Paddle(canvas.width - paddleWidth - 5, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, 10, "white");

function scoreGoal(player: number) {
    player ? scores.right++ : scores.left++;
    ball.dx = player ? -1 : 1;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

export default scoreGoal;

function updateGame() {
    ball.move(canvas.width, canvas.height);
    //ball.logPosition();
    //leftPaddle.logPosition();
    //rightPaddle.logPosition();
    console.log(`Scores: left : ${scores.left} | right : ${scores.right}`);
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
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Press P to Resume", canvas.width / 2, canvas.height / 1.5);
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
    if (event.key === "p") togglePause();
    if (event.key === "Escape") quitGame();
    if (isRunning) {
        if (event.key === "s") leftPaddle.moveUp(canvas.height);
        if (event.key === "x") leftPaddle.moveDown(canvas.height);
        if (event.key === "ArrowUp") rightPaddle.moveUp(canvas.height);
        if (event.key === "ArrowDown") rightPaddle.moveDown(canvas.height);
    }
});

gameLoop();
