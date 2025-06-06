import { Tournament } from "./tournament.js";
//const match: Match = new Match(true, "ME", "AI"); // Singleplayer
//const match: Match = new Match(false, "alice", "bob"); // Multiplayer
//match.start();
const tournament = new Tournament(["alice", "bob", "eve", "mike"]);
tournament.startNextMatch();
