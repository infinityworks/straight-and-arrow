module.exports = (executeQuery, app, tournamentArchers, predictions) => {

   return { showPredictionPage, sendPredictions };

    function showPredictionPage(req, res) {

        let predictionsObject = []
        console.log("the empty predob", predictionsObject)
        const tournamentID = req.params.tid
        const sessionID = 1

        
        predictions.getPredictions(sessionID, tournamentID, (playerPrediction) =>{
            
            playerPrediction.forEach((prediction) => {

                predictionsObject.push({archerPrediction:prediction})
            })
            console.log("original data", playerPrediction)
            console.log("new data", predictionsObject)


            app.render('prediction.html', {predictionsObject}, (err, content) => {
                res.render('fullpage.html', {
                    title: "Prediction Page",
                    year: "2017",
                    content: content
                })
            })
        })
        
    }

    function sendPredictions(req, res){

    }

}
