import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./config.js";
import { Match } from "./match.js";
import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";

export let canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
export let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let currentMatch: Match | null = null;

export function setMatch(match: Match) {
    currentMatch = match; 
}

export function getMatch(): Match | null {
    return currentMatch;
}

export let gameStates: { [key: string]: boolean } = {
    isFirstUpdate: true,
    isRunning: true,
    isEnd: true
}

export let keys: { [key: string]: boolean } = {
    w: false,
    s: false,
    Up: false,
    Down: false
};

export const ball = new Ball();
export const leftPaddle = new Paddle();
export const rightPaddle = new Paddle();
