import { Match } from "./match.js";
import { renderMatchIntro } from "./render.js";
export class Tournament {
    constructor(players) {
        this.players = players;
        this.matches = [];
        this.currentMatchIndex = 0;
        if (players.length !== 4)
            throw new Error("Tournament requires exactly 4 players.");
        this.matches.push(new Match(false, players[0], players[1]));
        this.matches.push(new Match(false, players[2], players[3]));
    }
    startNextMatch() {
        if (this.currentMatchIndex === 2) {
            this.matches.push(new Match(false, this.players[this.getLooserIndex(0)], this.players[this.getLooserIndex(1)]));
            this.matches.push(new Match(false, this.players[this.getWinnerIndex(0)], this.players[this.getWinnerIndex(1)]));
        }
        else if (this.currentMatchIndex === 4) {
            this.renderRanking();
            return;
        }
        const currentMatch = this.matches[this.currentMatchIndex];
        currentMatch.onEnd = () => {
            this.currentMatchIndex++;
            this.startNextMatch();
        };
        this.matchIntro();
    }
    matchIntro() {
        const currentMatch = this.matches[this.currentMatchIndex];
        renderMatchIntro(currentMatch);
        const handleKey = (e) => {
            if (e.key === "Enter") {
                document.removeEventListener("keydown", handleKey);
                currentMatch.start();
            }
        };
        document.addEventListener("keydown", handleKey);
    }
    renderRanking() {
        const ranking = [];
        ranking.push(this.matches[3].winner);
        ranking.push(this.getLooser(3));
        ranking.push(this.matches[2].winner);
        ranking.push(this.getLooser(2));
        this.players = ranking;
        console.log("Ranking: " + this.players);
    }
    getWinnerIndex(matchIndex) {
        return this.players.indexOf(this.matches[matchIndex].winner);
    }
    getLooserIndex(matchIndex) {
        return this.players.indexOf(this.getLooser(matchIndex));
    }
    getLooser(matchIndex) {
        return this.matches[matchIndex].player1 === this.matches[matchIndex].winner
            ? this.matches[matchIndex].player2 : this.matches[matchIndex].player1;
    }
}
