

module.exports = (logger, renderer, tournamentData) => {

    return { showTournamentArcherScore };

    function showTournamentArcherScore(req, res) {

        const tournamentId = req.params.tid;
        const archerId = req.params.aid;

        logger.log('controllers/tournament#showTournamentArcherScore', { 
            tournamentId,
            archerId
        });

        tournamentData.getTournamentArcherScore(tournamentId, archerId, (archerScore, arrowTotal) => {
            let tabulatedResults = []
            let counter = 0
            let endSelection = []


            archerScore.forEach((row) => {
                counter++
                endSelection.push(row)
                if (counter % 6 == 0) {
                    tabulatedResults.push({
                        endIndex: endSelection
                    });
                    endSelection = []
                }
            })

            if (archerScore.length == 0) {
                renderer.render(res, 'no-info.html', {
                    title: "Information not available",
                    year: "2017"
                });
            } else {
                renderer.render(res, 'archer-score.html', {
                    data: tabulatedResults,
                    scoreSend: arrowTotal,
                    title: "Archer Score for Tournament",
                    year: "2017",
                })
            }
        })
    }

};
