import { MAX_SPEED, MIN_SPEED, SPEED_INC } from "./config.js";
import { canvas, getMatch, gameStates, keys, ball, leftPaddle, rightPaddle } from "./state.js";
import { updateAI } from "./ia.js";
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
export function updateGame() {
    var _a;
    ball.move();
    if ((_a = getMatch()) === null || _a === void 0 ? void 0 : _a.isSinglePlayer)
        updateAI();
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
export function scoreGoal(playerIndex) {
    var _a, _b;
    (_a = getMatch()) === null || _a === void 0 ? void 0 : _a.updateScore(playerIndex);
    if ((_b = getMatch()) === null || _b === void 0 ? void 0 : _b.isSinglePlayer)
        gameStates.isFirstUpdate = true;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = playerIndex ? -1 : 1;
    ball.dy = 0;
    ball.speed = MIN_SPEED;
}
