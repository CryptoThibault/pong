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
    var _a, _b, _c;
    if (event.key === "Escape")
        quitGame();
    if (!gameStates.isEnd && event.key === "p")
        togglePause();
    if (event.key === "r")
        (_a = getMatch()) === null || _a === void 0 ? void 0 : _a.restart();
    if (gameStates.isRunning) {
        if (event.key === "w")
            keys.w = true;
        if (event.key === "s")
            keys.s = true;
        if (!((_b = getMatch()) === null || _b === void 0 ? void 0 : _b.isSinglePlayer) && event.key === "ArrowUp")
            keys.Up = true;
        if (!((_c = getMatch()) === null || _c === void 0 ? void 0 : _c.isSinglePlayer) && event.key === "ArrowDown")
            keys.Down = true;
    }
});
window.addEventListener("keyup", (event) => {
    var _a, _b;
    if (gameStates.isRunning) {
        if (event.key === "w")
            keys.w = false;
        if (event.key === "s")
            keys.s = false;
        if (!((_a = getMatch()) === null || _a === void 0 ? void 0 : _a.isSinglePlayer) && event.key === "ArrowUp")
            keys.Up = false;
        if (!((_b = getMatch()) === null || _b === void 0 ? void 0 : _b.isSinglePlayer) && event.key === "ArrowDown")
            keys.Down = false;
    }
});
export function gameLoop() {
    var _a;
    if (gameStates.isEnd) {
        gameStates.isRunning = false;
        (_a = getMatch()) === null || _a === void 0 ? void 0 : _a.end();
        renderEndMenu();
    }
    if (!gameStates.isRunning)
        return;
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}
export function initGame() {
    ball.init();
    leftPaddle.init(true);
    rightPaddle.init(false);
}
