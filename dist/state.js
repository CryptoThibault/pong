import { MIN_SPEED, PADDLE_SPEED, MAX_SCORE } from "./config.js";
import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
export let canvas = document.getElementById("gameCanvas");
export let ctx = canvas.getContext("2d");
export let gameStates = {
    isSinglePlayer: true,
    isRunning: true,
    isEnd: false
};
export let keys = {
    w: false,
    s: false,
    Up: false,
    Down: false
};
export let scores = { left: 0, right: 0 };
const dxStart = Math.floor(Math.random() * 2) ? -1 : 1;
export const ball = new Ball(canvas.width / 2, canvas.height / 2, 5, dxStart, 0, MIN_SPEED, "white");
const paddleWidth = canvas.width * 0.01;
const paddleHeight = canvas.height * 0.15;
export const leftPaddle = new Paddle(5, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, PADDLE_SPEED, "white");
export const rightPaddle = new Paddle(canvas.width - paddleWidth - 5, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, PADDLE_SPEED, "white");
export function scoreGoal(player) {
    player ? scores.left++ : scores.right++;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = player ? 1 : -1;
    ball.dy = 0;
    ball.speed = MIN_SPEED;
    if (scores.left === MAX_SCORE || scores.right === MAX_SCORE)
        gameStates.isEnd = true;
}
