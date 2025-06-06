import { BACKGROUND_COLOR, ITEMS_COLOR, MAX_SCORE } from "./config.js";
import { canvas, ctx, getMatch, ball, leftPaddle, rightPaddle } from "./state.js";
function drawScores() {
    var _a, _b;
    ctx.font = "100px 'Press Start 2P'";
    ctx.fillStyle = ITEMS_COLOR;
    ctx.fillText(`${(_a = getMatch()) === null || _a === void 0 ? void 0 : _a.score[0]}`, canvas.width / 2 - 100, 120);
    ctx.fillText(`${(_b = getMatch()) === null || _b === void 0 ? void 0 : _b.score[1]}`, canvas.width / 2 + 100, 120);
}
function drawCenterLine() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = ITEMS_COLOR;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
}
function drawText() {
    ctx.font = "40px 'Press Start 2P'";
    ctx.fillStyle = ITEMS_COLOR;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("Pong".split('').join(' '.repeat(1)), canvas.width / 2, canvas.height - 10);
}
export function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    leftPaddle.draw();
    rightPaddle.draw();
    drawScores();
    drawCenterLine();
    drawText();
}
export function renderPauseMenu() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ITEMS_COLOR;
    ctx.font = "24px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 5);
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText("Press P to Resume", canvas.width / 2, canvas.height / 5 * 2);
    ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 5 * 3);
    ctx.fillText("Press ESC to Quit", canvas.width / 2, canvas.height / 5 * 4);
}
export function renderEndMenu() {
    var _a, _b, _c;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ITEMS_COLOR;
    ctx.font = "24px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("END", canvas.width / 2, canvas.height / 5);
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText(`Congratulation ${((_a = getMatch()) === null || _a === void 0 ? void 0 : _a.score[0]) === MAX_SCORE ? (_b = getMatch()) === null || _b === void 0 ? void 0 : _b.player1 : (_c = getMatch()) === null || _c === void 0 ? void 0 : _c.player2}, you win!`, canvas.width / 2, canvas.height / 5 * 2);
    ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 5 * 3);
    ctx.fillText("Press ESC to Quit", canvas.width / 2, canvas.height / 5 * 4);
}
export function renderMatchIntro(match) {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ITEMS_COLOR;
    ctx.font = "24px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("Next Match", canvas.width / 2, canvas.height / 5);
    ctx.fillText(`${match.player1} vs ${match.player2}`, canvas.width / 2, canvas.height / 5 * 2);
    ctx.font = "16px 'Press Start 2P'";
    //ADD last match score if exist
    ctx.fillText("Press ENTER to start", canvas.width / 2, canvas.height / 5 * 3.5);
}
