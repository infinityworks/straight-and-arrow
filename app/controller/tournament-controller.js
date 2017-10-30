module.exports = (executeQuery, app, tournamentScore, tabulatedResults, tournamentStats) => {

   return { showTournamentArcherScore };

    function showTournamentArcherScore(req, res) {

        const tournamentID = req.params.tid;
        const archerID = req.params.aid;
        let archerScore = []

        tournamentScore.getTournamentArcherScore(tournamentID, archerID, (archerData, arrowTotal, archerName) => {
                let archer = []
                archer.id = archerName
                archer.ends = tabulatedResults(archerData)
                archer.summary = arrowTotal
                archerScore.push(archer)

                if (archerData.length == 0) {
                    app.render('no-info.html', {}, (err, content) => {
                        res.render('fullpage.html', {
                            title: "Information not available",
                            year: "2017",
                            content: content
                        })

                    })
                } else {
                    app.render('archer-score.html', {
                        data: archerScore,
                    }, (err, content) => {
                        res.render('fullpage.html', {
                            title: "Archer Score for Tournament",
                            year: "2017",
                            content: content
                        })
                    })
                }
        })
    }
}
