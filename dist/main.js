import { Tournament } from "./tournament.js";
document.fonts.load("16px 'Press Start 2P'");
window.onload = () => {
    //const match: Match = new Match(0, "ME", "AI"); // Singleplayer
    //const match: Match = new Match(1, "alice", "bob"); // Multiplayer
    //match.start();
    const tournament = new Tournament(["alice", "bob", "eve", "mike"]);
    tournament.startNextMatch();
};
