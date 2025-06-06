import { MAX_SCORE } from "./config.js";
import { setMatch, gameStates } from "./state.js";
import { gameLoop, initGame } from "./game.js";

export class Match {
    winner: string | null = null;
    score: number[] = [0, 0];
    isEnd: boolean = false;

    onEnd?: () => void;

    constructor(
        public isSinglePlayer: boolean,
        public player1: string,
        public player2: string
    ) {}

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
        } else initGame();
    }

    end() {
        this.isEnd = true;
        this.winner = this.score[0] === MAX_SCORE ? this.player1 : this.player2;

        if (this.onEnd) this.onEnd();

        console.log(`Send to DB: player ${this.winner} win, score ${this.score}`);
        //this.sendResult();
    }

    updateScore(playerIndex: number) {
        this.score[playerIndex]++;
        if (this.score[playerIndex] === MAX_SCORE)
            gameStates.isEnd = true;
    }

    async sendResult() {
        try {
            const response = await fetch("/api/v1/user/matches", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    player1: this.player1,
                    player2: this.player2,
                    score: this.score,
                    winner: this.winner,
                }),
            });

            if (!response.ok) throw new Error("Failed to send match result");
        } catch (err) {
            console.error("Send error:", err);
        }
    }
}