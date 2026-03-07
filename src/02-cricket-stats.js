import { run } from "jest";

/**
 * 🏏 Cricket Player Stats Dashboard
 *
 * IPL ka stats dashboard bana raha hai tu! Har function ARROW FUNCTION
 * hona chahiye (const fn = () => ...). Regular function declarations
 * mat use karna — arrow functions ki practice karna hai!
 *
 * Functions (sab arrow functions honge):
 *
 *   1. calcStrikeRate(runs, balls)
 *      - Strike rate = (runs / balls) * 100, rounded to 2 decimal places
 *      - Agar balls <= 0 ya runs < 0, return 0
 *
 *   2. calcEconomy(runsConceded, overs)
 *      - Economy = runsConceded / overs, rounded to 2 decimal places
 *      - Agar overs <= 0 ya runsConceded < 0, return 0
 *
 *   3. calcBattingAvg(totalRuns, innings, notOuts = 0)
 *      - Batting avg = totalRuns / (innings - notOuts), rounded to 2 decimal places
 *      - Default notOuts = 0
 *      - Agar innings - notOuts <= 0, return 0
 *
 *   4. isAllRounder(battingAvg, economy)
 *      - Return true agar battingAvg > 30 AND economy < 8
 *
 *   5. getPlayerCard(player)
 *      - player object: { name, runs, balls, totalRuns, innings, notOuts, runsConceded, overs }
 *      - Return: { name, strikeRate, economy, battingAvg, isAllRounder }
 *      - Use the above functions internally
 *      - Agar player null/undefined hai ya name missing, return null
 *
 * Hint: Use const fn = (params) => expression or const fn = (params) => { ... }
 *
 * @example
 *   calcStrikeRate(45, 30)  // => 150
 *   calcEconomy(24, 4)      // => 6
 *   getPlayerCard({ name: "Jadeja", runs: 35, balls: 20, totalRuns: 2000, innings: 80, notOuts: 10, runsConceded: 1500, overs: 200 })
 *   // => { name: "Jadeja", strikeRate: 175, economy: 7.5, battingAvg: 28.57, isAllRounder: false }
 */
export const calcStrikeRate = (runs, balls) => {
    const calcStrikeRatefn = (runs, balls) => {
        if (balls <= 0 || runs < 0) {
            return 0;
        }
        let res = ((runs / balls) * 100).toFixed(2);
        res = Number(res);

        return res;
    };
    return calcStrikeRatefn(runs, balls);
};

export const calcEconomy = (runsConceded, overs) => {
    const fn = (runsConceded, overs) => {
        if (overs <= 0 || runsConceded < 0) {
            return 0;
        }
        return runsConceded / overs;
    };
    return fn(runsConceded, overs);
};

export const calcBattingAvg = (totalRuns, innings, notOuts = 0) => {
    const fn = (totalRuns, innings, notOuts) => {
        if (!notOuts || notOuts == false) {
            notOuts = 0;
        }
        let temp = innings - notOuts;
        if (temp <= 0) {
            return 0;
        }
        let BattingAvg = totalRuns / temp.toFixed(2);
        return parseFloat(BattingAvg.toFixed(2));
    };
    return fn(totalRuns, innings, notOuts);
};

export const isAllRounder = (battingAvg, economy) => {
    const fn = (battingAvg, economy) => {
        if (battingAvg > 30 && economy < 8) {
            return true;
        } else {
            return false;
        }
    };
    return fn(battingAvg, economy);
};

export const getPlayerCard = (player) => {
    if (!player || typeof player === undefined || !player.name) {
        return null;
    }
    const fn = (player) => {
        return {
            // - player object: { name, runs, balls, totalRuns, innings, notOuts, runsConceded, overs }
            name: player.name,
            strikeRate: calcStrikeRate(player.runs, player.balls),
            economy: calcEconomy(player.runsConceded, player.overs),
            battingAvg: calcBattingAvg(
                player.totalRuns,
                player.innings,
                player.notOuts,
            ),
            isAllRounder: isAllRounder(player.battingAvg, player.economy),
        };
    };
    return fn(player);
};
