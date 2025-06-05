import { Match } from "./match.js"

const match: Match = new Match(true, "ME", "AI"); // Singleplayer
//const match: Match = new Match(false, "alice", "bob"); // Multiplayer
match.start();