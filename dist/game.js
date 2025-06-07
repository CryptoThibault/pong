import { match, setAnimationId, gameStates, keys, ball, leftPaddle, rightPaddle } from "./state.js";
import { updateGame } from "./update.js";
import { renderGame } from "./render.js";
function quitGame() {
    window.location.reload();
}
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape")
        quitGame();
    if (!gameStates.isIntro && !gameStates.isEnd && event.key === "p")
        match === null || match === void 0 ? void 0 : match.pause();
    if (!gameStates.isIntro && event.key === "r")
        match === null || match === void 0 ? void 0 : match.restart();
    if (gameStates.isIntro && event.key === "Enter") {
        gameStates.isIntro = false;
        setAnimationId(requestAnimationFrame(gameLoop));
    }
    if (gameStates.isRunning) {
        if (event.key === "w")
            keys.w = true;
        if (event.key === "s")
            keys.s = true;
        if ((match === null || match === void 0 ? void 0 : match.gameMode) && event.key === "ArrowUp")
            keys.Up = true;
        if ((match === null || match === void 0 ? void 0 : match.gameMode) && event.key === "ArrowDown")
            keys.Down = true;
    }
});
window.addEventListener("keyup", (event) => {
    if (gameStates.isRunning) {
        if (event.key === "w")
            keys.w = false;
        if (event.key === "s")
            keys.s = false;
        if ((match === null || match === void 0 ? void 0 : match.gameMode) && event.key === "ArrowUp")
            keys.Up = false;
        if ((match === null || match === void 0 ? void 0 : match.gameMode) && event.key === "ArrowDown")
            keys.Down = false;
    }
});
export function gameLoop() {
    if (!gameStates.isRunning || gameStates.isEnd) {
        setAnimationId(null);
        return;
    }
    updateGame();
    renderGame();
    setAnimationId(requestAnimationFrame(gameLoop));
}
export function initGame() {
    if ((match === null || match === void 0 ? void 0 : match.gameMode) === 2)
        gameStates.isIntro = true;
    gameStates.isRunning = true;
    gameStates.isEnd = false;
    gameStates.isFirstUpdate = true;
    ball.init();
    leftPaddle.init(true);
    rightPaddle.init(false);
}
