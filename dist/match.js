var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MAX_SCORE } from "./config.js";
import { setMatch, gameStates } from "./state.js";
import { gameLoop, initGame } from "./game.js";
export class Match {
    constructor(isSinglePlayer, player1, player2) {
        this.isSinglePlayer = isSinglePlayer;
        this.player1 = player1;
        this.player2 = player2;
        this.winner = null;
        this.score = [0, 0];
        this.isEnd = false;
    }
    start() {
        setMatch(this);
        initGame();
        gameLoop();
    }
    restart() {
        this.winner = null;
        this.score = [0, 0];
        this.isEnd = false;
        gameStates.isEnd = false;
        if (!gameStates.isRunning) {
            gameStates.isRunning = true;
            initGame();
            gameLoop();
        }
        else
            initGame();
    }
    end() {
        this.isEnd = true;
        this.winner = this.score[0] === MAX_SCORE ? this.player1 : this.player2;
        if (this.onEnd)
            this.onEnd();
        console.log(`Send to DB: player ${this.winner} win, score ${this.score}`);
        //this.sendResult();
    }
    updateScore(playerIndex) {
        this.score[playerIndex]++;
        if (this.score[playerIndex] === MAX_SCORE)
            gameStates.isEnd = true;
    }
    sendResult() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("/api/v1/user/matches", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        player1: this.player1,
                        player2: this.player2,
                        score: this.score,
                        winner: this.winner,
                    }),
                });
                if (!response.ok)
                    throw new Error("Failed to send match result");
            }
            catch (err) {
                console.error("Send error:", err);
            }
        });
    }
}
