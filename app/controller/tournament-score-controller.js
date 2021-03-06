const utility = require('../util/utilities')

module.exports = (executeQuery, app, tournamentArchers, tournamentScore, tournamentStats, tabulatedResults) => {

   return { showTournamentScore };

    function showTournamentScore(req, res) {

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
                            app.render('tournament-score.html', {
                                data: tournamentScores
                            }, (err, content) => {
                                res.render('fullpage.html', {
                                    title: "Archer Scores for Tournament",
                                    year: "2017",
                                    content: content,
                                    loginOptions: utility.loginOptions(req.session.playerID !== undefined)
                                })
                            })
                        }
                    })
                })
            })
        })
    }
}
