// import { getPlayersSummary } from "./GetPlayers";
import { getScores } from "./GetScores";
import { PlayerInfos } from "scoresaber-api";
import * as fs from "fs";

async function main() {
    // const Players = await getPlayersSummary(20);
    // fs.writeFileSync("./Data/Top1000Players.json", JSON.stringify(Players, null, 4));

    const PlayersRaw: PlayerInfos = JSON.parse(fs.readFileSync("./Data/Top1000Players.json", "utf8"));
    const PlayerIDList = PlayersRaw.players.map(p => p.playerId);
    const PlayerNameList = PlayersRaw.players.map(p => p.playerName);

    for( let i = 0; i < PlayerIDList.length; i++) {
        const PlayerID = PlayerIDList[i];
        const PlayerName = PlayerNameList[i];
        const Scores = await getScores(PlayerID);
        fs.writeFileSync(`./Data/Scores/${PlayerID}(${PlayerName}).json`, JSON.stringify(Scores, null, 4));
    }
}

main();