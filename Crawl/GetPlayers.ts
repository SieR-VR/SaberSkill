import { searchPlayersFromTop, PlayerInfos, PlayerInfoFull, getPlayer } from "scoresaber-api";

export async function getPlayersSummary(pageCount: number): Promise<PlayerInfos> {
    const PlayerSet: PlayerInfos = { players: [] };
    for (let i = 1; i <= pageCount; i++) {
        const players = await searchPlayersFromTop(i);

        if('error' in players) {
            console.log(`Error: ${players.error}`);
            continue;
        }      
            
        PlayerSet.players = PlayerSet.players.concat(players.players);
    }

    return PlayerSet;
}

export async function getPlayers(IDList: string[]): Promise<PlayerInfoFull[]> {
    const players: PlayerInfoFull[] = [];
    for (let i = 0; i < IDList.length; i++) {
        const player = await getPlayer(IDList[i]);

        if('error' in player) {
            console.log(`Error: ${player.error}`);
            continue;
        }

        players.push(player);
    }

    return players;
}