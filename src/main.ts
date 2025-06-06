import { Match } from "./match.js"
import { Tournament } from "./tournament.js"

//const match: Match = new Match(true, "ME", "AI"); // Singleplayer
//const match: Match = new Match(false, "alice", "bob"); // Multiplayer
//match.start();

const tournament: Tournament = new Tournament(["alice", "bob", "eve", "mike"]);
tournament.startNextMatch();