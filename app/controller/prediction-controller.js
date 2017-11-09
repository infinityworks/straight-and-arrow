module.exports = (executeQuery, app, tournamentArchers, predictions) => {

   return { showPredictionPage, sendPrediction };

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
                    title: "Predictions",
                    year: "2017",
                    content: content
                })
            })
        })
    }

    function sendPrediction(req, res){

        if(req.session.email === undefined || req.session.email === ''){
            return res.redirect('/login');
        }

        const playerID = req.session.playerID
        scoreInput = req.body
        predictionList = []
        counter = 0

        for (var key in scoreInput) {
        if (scoreInput.hasOwnProperty(key)){
            keyPair = [key,scoreInput[key]]
            predictionList.push(keyPair)
        }

        predictionList.forEach((prediction)=> {
            executeQuery(`INSERT INTO prediction (player, tournament, archer, pred_score) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE pred_score=VALUES(pred_score)`, 
                [playerID, scoreInput.tid[0], prediction[0], prediction[1]], (result) => {
                    counter++
                    if(counter == 3){
                        res.redirect('/prediction/'+scoreInput.tid[0])
                    }
                })
            })
        }   

    }





}
