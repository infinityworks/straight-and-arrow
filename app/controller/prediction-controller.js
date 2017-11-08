module.exports = (executeQuery, app, tournamentArchers) => {

   return { showPredictionPage };

    function showPredictionPage(req, res) {

        const tournamentID = req.params.tid
        const archerID = 1

        tournamentArchers.getTournamentArchers(tournamentID, archerID, (archerIDs) => {
            //console.log(archerIDs)



            app.render('prediction.html', {archerIDs}, (err, content) => {
                res.render('fullpage.html', {
                    title: "Predictions",
                    year: "2017",
                    content: content
                })
            })
        })
    }

}