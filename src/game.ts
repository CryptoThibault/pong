import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js"

const MIN_SPEED = 8;
const MAX_SPEED = 15;
const SPEED_INC = 1.1;
const PADDLE_SPEED = 8;
const MAX_SCORE = 5;

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let isRunning: boolean = true;
let isEnd: boolean = false;
let keys: { [key: string]: boolean } = {
    "w": false,
    "s": false,
    "Up": false,
    "Down": false
};

let scores = {left: 0, right: 0};

const dxStart = Math.floor(Math.random() * 2) ? -1 : 1;
const ball = new Ball(canvas.width / 2, canvas.height / 2, 5, dxStart, 0, MIN_SPEED, "white");

const paddleWidth = canvas.width * 0.01;
const paddleHeight = canvas.height * 0.15;
const leftPaddle = new Paddle(5, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, PADDLE_SPEED, "white");
const rightPaddle = new Paddle(canvas.width - paddleWidth - 5, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, PADDLE_SPEED, "white");

function scoreGoal(player: number) {
    player ? scores.left++ : scores.right++;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = player ? 1 : -1;
    ball.dy = 0;
    ball.speed = MIN_SPEED;
    if (scores.left === MAX_SCORE || scores.right === MAX_SCORE)
        isEnd = true;
}

export default scoreGoal;

function hitPaddle(ball:Ball, paddle: Paddle): boolean {
    return (
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.y + ball.radius > paddle.y
    );
}

function onPaddleHit(ball: Ball, paddle: Paddle): void {
    const paddleCenterY = paddle.y + paddle.height / 2;
    ball.dy = (ball.y - paddleCenterY) / (paddle.height / 2);
    ball.dx = -ball.dx;

    const length = Math.hypot(ball.dx, ball.dy);
    ball.dx /= length;
    ball.dy /= length;
    ball.speed = Math.min(ball.speed * SPEED_INC, MAX_SPEED);
    ball.x += ball.dx * ball.radius;
}  

function updateGame() {
    ball.move(canvas.width, canvas.height);
    if (keys.w) leftPaddle.moveUp(canvas.height);
    if (keys.s) leftPaddle.moveDown(canvas.height);
    if (keys.Up) rightPaddle.moveUp(canvas.height);
    if (keys.Down) rightPaddle.moveDown(canvas.height);
    if (hitPaddle(ball, leftPaddle))
        onPaddleHit(ball, leftPaddle);
    if (hitPaddle(ball, rightPaddle))
        onPaddleHit(ball, rightPaddle);
}

function drawScores(): void {
    ctx.font = "100px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText(`${scores.left}`, canvas.width / 2 - 100, 120);
    ctx.fillText(`${scores.right}`, canvas.width / 2 + 100, 120);
}

function drawCenterLine(): void {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
}

function drawText(): void {
    ctx.font = "40px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("Pong".split('').join(' '.repeat(1)), canvas.width / 2, canvas.height - 10);
}

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw(ctx);
    leftPaddle.draw(ctx);
    rightPaddle.draw(ctx);
    drawScores();
    drawCenterLine();
    drawText();
}

function renderPauseMenu() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = "white";
    ctx.font = "20px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 5);
    ctx.fillText("Press P to Resume", canvas.width / 2, canvas.height / 5 * 2);
    ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 5 * 3);
    ctx.fillText("Press ESC to Quit", canvas.width / 2, canvas.height / 5 * 4);
}

function renderEndMenu() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("END", canvas.width / 2, canvas.height / 5);
    ctx.fillText(`${scores.left === MAX_SCORE ? "Left" : "Right"} player win !`, canvas.width / 2, canvas.height / 5 * 2);
    ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 5 * 3);
    ctx.fillText("Press ESC to Quit", canvas.width / 2, canvas.height / 5 * 4);
}

function togglePause() {
    isRunning = !isRunning;
    isRunning ? requestAnimationFrame(gameLoop) : renderPauseMenu();
}

function restartGame() {
    window.location.reload();
}

function quitGame() {
    window.location.reload();
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") quitGame();
    if (!isEnd && event.key === "p") togglePause();
    if (event.key === "r") restartGame();
    if (isRunning) {
        if (event.key === "w") keys.w = true;
        if (event.key === "s") keys.s = true;
        if (event.key === "ArrowUp") keys.Up = true;
        if (event.key === "ArrowDown") keys.Down = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (isRunning) {
        if (event.key === "w") keys.w = false;
        if (event.key === "s") keys.s = false;
        if (event.key === "ArrowUp") keys.Up = false;
        if (event.key === "ArrowDown") keys.Down = false;
    }
});

function gameLoop() {
    if (isEnd) {
        isRunning = false;
        renderEndMenu();
    }
    if (!isRunning) return;
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
