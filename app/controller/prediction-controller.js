module.exports = (executeQuery, app, tournamentArchers, predictions) => {

   return { showPredictionPage, sendPredictions };

    function showPredictionPage(req, res) {
        if(req.session.email === undefined || req.session.email === ''){
            return res.redirect('/login');
        }

        let predictionsObject = []
        const tournamentID = req.params.tid
        const playerID = req.session.playerID

        predictions.getPredictions(playerID, tournamentID, (playerPrediction) =>{
            
            playerPrediction.forEach((prediction) => {

                predictionsObject.push({archerPrediction:prediction})
            })

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

        if(req.session.email === undefined || req.session.email === ''){
            return res.redirect('/login');
        }
    }
}
