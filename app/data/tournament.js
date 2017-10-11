
module.exports = (executeQuery) => {

    return { getTournamentArcherScore };

    function getTournamentArcherScore(tournamentId, archerId, callback){

        console.log('data/tournament#getTournamentArcherScore', { tournamentId, archerId });

        executeQuery(`SELECT arrow, score, spider
            FROM arrow arr
            INNER JOIN tournament tour
            ON arr.tournament = tour.id
            INNER JOIN archer arch
            ON arr.archer = arch.id
            WHERE arr.tournament = ? AND arr.archer = ? ORDER BY arr.arrow`, 
                [tournamentId, archerId], (archerScore) => {
            executeQuery(`SELECT SUM(arr.score) AS total,
                SUM(arr.spider) AS spidtot,
                Count(case arr.score when 0 then null else 1 END) as Hits,
                Count(case arr.score when 0 then 1 else null END) as Misses,
                Count(case arr.score when 9 or 10 then 1 else null END) as Golds
                FROM arrow arr WHERE arr.tournament = ? AND archer = ?`, 
                    [tournamentId, archerId], (arrowTotal) => {

                console.log('data/tournament#getTournamentArcherScore', { success: true });

                callback(archerScore, arrowTotal);

            });

        });

    }

};
