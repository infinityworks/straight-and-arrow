module.exports = (executeQuery, app, tournamentArchers, tournamentScore, tournamentStats, tabulatedResults) => {

   return { showTournamentScoreInput };

    function showTournamentScoreInput(req, res) {

        const tournamentID = req.params.tid;
        const archerID = req.params.aid;
        let tournamentScores = []
        tournamentArchers.getTournamentArchers(tournamentID, archerID, (archerIDs) => {
            archerIDs.forEach((archerID)=>{
                tournamentScore.getTournamentScore(tournamentID, archerID.archer_id, (archerData) => {
                    tournamentStats.getTournamentStats(tournamentID, archerID.archer_id, (archerStats) => {

                        let archer = []
                        archer.id = archerID
                        archer.ends = tabulatedResults(archerData)
                        archer.summary = archerStats
                        tournamentScores.push(archer)

                        if (archerIDs.length == tournamentScores.length){
                            tournamentScores.sort(compare)

                            function compare(a, b) {
                              if (a.id.archer_id < b.id.archer_id ) {
                                return -1;
                              }
                              if (a.id.archer_id > b.id.archer_id ) {
                                return 1;
                              }
                              // a must be equal to b
                              return 0;
                            }

                            app.render('score-input.html', {
                                data: tournamentScores
                            }, (err, content) => {
                                res.render('fullpage.html', {
                                    title: "Archer Score for Tournament",
                                    year: "2017",
                                    content: content
                                })
                            })
                        }
                    })
                })
            })
        })
    }
}
