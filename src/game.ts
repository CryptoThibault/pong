import { getMatch, gameStates, keys, ball, leftPaddle, rightPaddle } from "./state.js";
import { updateGame } from "./update.js";
import { renderGame, renderPauseMenu, renderEndMenu } from "./render.js";

function togglePause() {
    gameStates.isRunning = !gameStates.isRunning;
    gameStates.isRunning ? requestAnimationFrame(gameLoop) : renderPauseMenu();
}

function quitGame() {
    window.location.reload();
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") quitGame();
    if (!gameStates.isEnd && event.key === "p") togglePause();
    if (event.key === "r") getMatch()?.restart();
    if (gameStates.isRunning) {
        if (event.key === "w") keys.w = true;
        if (event.key === "s") keys.s = true;
        if (!getMatch()?.isSinglePlayer && event.key === "ArrowUp") keys.Up = true;
        if (!getMatch()?.isSinglePlayer && event.key === "ArrowDown") keys.Down = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (gameStates.isRunning) {
        if (event.key === "w") keys.w = false;
        if (event.key === "s") keys.s = false;
        if (!getMatch()?.isSinglePlayer && event.key === "ArrowUp") keys.Up = false;
        if (!getMatch()?.isSinglePlayer && event.key === "ArrowDown") keys.Down = false;
    }
});

export function gameLoop() {
    if (gameStates.isEnd) {
        gameStates.isRunning = false;
        renderEndMenu();
        getMatch()?.end();
    }
    if (!gameStates.isRunning) return;
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}

export function initGame() {
    gameStates.isEnd = false;
    ball.init();
    leftPaddle.init(true);
    rightPaddle.init(false);
}
