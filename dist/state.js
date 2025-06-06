import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./config.js";
import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
export let canvas = document.getElementById("gameCanvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
export let ctx = canvas.getContext("2d");
let currentMatch = null;
export function setMatch(match) {
    currentMatch = match;
}
export function getMatch() {
    return currentMatch;
}
export let gameStates = {
    isFirstUpdate: true,
    isRunning: true,
    isEnd: true
};
export let keys = {
    w: false,
    s: false,
    Up: false,
    Down: false
};
export const ball = new Ball();
export const leftPaddle = new Paddle();
export const rightPaddle = new Paddle();
