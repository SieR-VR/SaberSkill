import { getPlayerTopScores, PlayerScores } from 'scoresaber-api';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms, 0));

export async function getScores(player: string): Promise<PlayerScores> {
    const PlayerScoresFromTop: PlayerScores = { scores: [] };
    for (let i = 1; ; i++) {
        const scores = await getPlayerTopScores(player, i);
        if ('error' in scores) { 
            console.log(scores.error.message);
            await sleep(1000);
            continue; 
        }
        if (scores.scores.find(s => s.pp === 0)) {
            PlayerScoresFromTop.scores.push(...scores.scores.filter(s => s.pp !== 0));
            break;
        }
        PlayerScoresFromTop.scores.push(...scores.scores);
        console.log(`Fetching scores for ${player}... (${PlayerScoresFromTop.scores.length}/??)`);
        await sleep(1000);
    }

    console.log(`Fetched ${PlayerScoresFromTop.scores.length} scores for ${player}`);
    return PlayerScoresFromTop;
}