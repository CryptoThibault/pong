import { Ball } from "./ball.js";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let isRunning = true;
const ball = new Ball(250, 250, 15, 1, 2, "#ffffff");
function updateGame() {
    ball.move(canvas.width, canvas.height);
    //ball.logPosition();
}
function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw(ctx);
}
function renderPauseMenu() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 3);
    ctx.fillText("Press ENTER to Resume", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Press X to Quit", canvas.width / 2, canvas.height / 1.5);
}
function gameLoop() {
    if (!isRunning)
        return;
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}
function togglePause() {
    isRunning = !isRunning;
    if (isRunning)
        requestAnimationFrame(gameLoop);
    else
        renderPauseMenu();
}
function quitGame() {
    window.location.reload();
}
function playerMove(playerId, direction) {
    console.log(`PlayerId: ${playerId}, direction: ${direction}`);
}
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape")
        togglePause();
    if (isRunning) {
        if (event.key === "q")
            playerMove(0, 0);
        if (event.key === "s")
            playerMove(0, 1);
        if (event.key === "p")
            playerMove(0, 1);
        if (event.key === "l")
            playerMove(1, 1);
    }
    else {
        if (event.key === "Enter")
            togglePause();
        if (event.key === "x")
            quitGame();
    }
});
gameLoop();
