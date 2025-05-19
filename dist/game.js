import { MAX_SPEED, SPEED_INC, MAX_SCORE } from "./config.js";
import { isEnd, isRunning, setIsRunning, keys, scores, ball, leftPaddle, rightPaddle } from "./state.js";
import { renderGame, renderPauseMenu, renderEndMenu } from "./render.js";
function hitPaddle(ball, paddle) {
    return (ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.y + ball.radius > paddle.y);
}
function onPaddleHit(ball, paddle) {
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
    if (keys.w)
        leftPaddle.moveUp();
    if (keys.s)
        leftPaddle.moveDown();
    if (keys.Up)
        rightPaddle.moveUp();
    if (keys.Down)
        rightPaddle.moveDown();
    if (hitPaddle(ball, leftPaddle))
        onPaddleHit(ball, leftPaddle);
    if (hitPaddle(ball, rightPaddle))
        onPaddleHit(ball, rightPaddle);
}
function togglePause() {
    setIsRunning(!isRunning);
    isRunning ? requestAnimationFrame(gameLoop) : renderPauseMenu();
}
function restartGame() {
    window.location.reload();
}
function quitGame() {
    window.location.reload();
}
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape")
        quitGame();
    if (!isEnd && event.key === "p")
        togglePause();
    if (event.key === "r")
        restartGame();
    if (isRunning) {
        if (event.key === "w")
            keys.w = true;
        if (event.key === "s")
            keys.s = true;
        if (event.key === "ArrowUp")
            keys.Up = true;
        if (event.key === "ArrowDown")
            keys.Down = true;
    }
});
window.addEventListener('keyup', (event) => {
    if (isRunning) {
        if (event.key === "w")
            keys.w = false;
        if (event.key === "s")
            keys.s = false;
        if (event.key === "ArrowUp")
            keys.Up = false;
        if (event.key === "ArrowDown")
            keys.Down = false;
    }
});
function gameLoop() {
    if (isEnd) {
        setIsRunning(false);
        renderEndMenu(scores.left === MAX_SCORE);
    }
    if (!isRunning)
        return;
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}
gameLoop();
