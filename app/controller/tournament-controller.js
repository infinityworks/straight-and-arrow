module.exports = (executeQuery, app, tournamentArcherScore) => {

   return { showTournamentArcherScore };


    function showTournamentArcherScore(req, res) {

        const tournamentId = req.params.tid;
        const archerId = req.params.aid;

        tournamentArcherScore.getTournamentArcherScore(tournamentId, archerId, (archerScore, arrowTotal) => {


            let tabulatedResults = []
            let counter = 0
            let endSelection = []


            archerScore.forEach((row) => {
            	if (row.score == 0){
             		row.score = 'M'
             	}
             	if (row.spider.lastIndexOf(1) !== -1){
             	    row.score = 'X'
    				}
                counter++
                endSelection.push(row)
                if (counter % 6 == 0) {
                    tabulatedResults.push({
                        endIndex: endSelection
                    })
                    endSelection = []
                }
            })

            if (archerScore.length == 0) {
                app.render('no-info.html', {}, (err, content) => {
                    res.render('fullpage.html', {
                        title: "Information not available",
                        year: "2017",
                        content: content
                    })

                })
            } else {
                app.render('archer-score.html', {
                    data: tabulatedResults,
                    scoreSend: arrowTotal
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
