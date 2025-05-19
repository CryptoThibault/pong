import { MAX_SPEED, SPEED_INC, MAX_SCORE } from "./config.js";
import { gameStates, keys, scores, ball, leftPaddle, rightPaddle } from "./state.js";
import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
import { renderGame, renderPauseMenu, renderEndMenu } from "./render.js";
import { updateAI } from "./ia.js";

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
    ball.move();
    if (gameStates.isSinglePlayer) updateAI();
    if (keys.w) leftPaddle.moveUp();
    if (keys.s) leftPaddle.moveDown();
    if (keys.Up) rightPaddle.moveUp();
    if (keys.Down) rightPaddle.moveDown();
    if (hitPaddle(ball, leftPaddle)) onPaddleHit(ball, leftPaddle);
    if (hitPaddle(ball, rightPaddle)) onPaddleHit(ball, rightPaddle);
}

function togglePause() {
    gameStates.isRunning = !gameStates.isRunning;
    gameStates.isRunning ? requestAnimationFrame(gameLoop) : renderPauseMenu();
}

function restartGame() {
    window.location.reload();
}

function quitGame() {
    window.location.reload();
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") quitGame();
    if (!gameStates.isEnd && event.key === "p") togglePause();
    if (event.key === "r") restartGame();
    if (gameStates.isRunning) {
        if (event.key === "w") keys.w = true;
        if (event.key === "s") keys.s = true;
        if (!gameStates.isSinglePlayer && event.key === "ArrowUp") keys.Up = true;
        if (!gameStates.isSinglePlayer && event.key === "ArrowDown") keys.Down = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (gameStates.isRunning) {
        if (event.key === "w") keys.w = false;
        if (event.key === "s") keys.s = false;
        if (!gameStates.isSinglePlayer && event.key === "ArrowUp") keys.Up = false;
        if (!gameStates.isSinglePlayer && event.key === "ArrowDown") keys.Down = false;
    }
});

function gameLoop() {
    if (gameStates.isEnd) {
        gameStates.isRunning = false;
        renderEndMenu(scores.left === MAX_SCORE);
    }
    if (!gameStates.isRunning) return;
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
