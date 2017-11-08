module.exports = (executeQuery, app, tournamentArchers, predictions) => {

   return { showPredictionPage, sendPredictions };

    function showPredictionPage(req, res) {

        let predictionsObject = [{predictionObject1:{}},
                                {predictionObject2:{}},
                                {predictionObject3:{}}]
        console.log("the empty predob", predictionsObject)
        const tournamentID = req.params.tid
        const archerID = 1
        const sessionID = 1

        tournamentArchers.getTournamentArchers(tournamentID, archerID, (archerIDs) => {
            predictions.getPredictions(sessionID, tournamentID, (playerPrediction) =>{
                console.log("possible archer id", archerIDs)
                console.log("original data", playerPrediction)



                app.render('prediction.html', {archerIDs, playerPrediction}, (err, content) => {
                    res.render('fullpage.html', {
                        title: "Prediction Page",
                        year: "2017",
                        content: content
                    })
                })
            })
        })
    }



    function sendPredictions(req, res){

    }

}
