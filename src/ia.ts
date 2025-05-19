import { REACTION_TIME, IMPRECISION } from "./config.js";
import { canvas, ball, keys, rightPaddle } from "./state.js";

let lastUpdate = 0;

export function updateAI() {
  if (ball.x < canvas.width / 2) {
    keys.Up = false;
    keys.Down = false;
    return;
  }

  let currentTime = performance.now();
  if (currentTime - lastUpdate < REACTION_TIME) return;
  lastUpdate = currentTime;

  const targetY = ball.y + (Math.random() - 0.5) * IMPRECISION;

  if (targetY < rightPaddle.y) {
    keys.Up = true;
    keys.Down = false;
  } else if (targetY > rightPaddle.y + rightPaddle.height) {
    keys.Up = false;
    keys.Down = true;
  } else {
    keys.Up = false;
    keys.Down = false;
  }
}