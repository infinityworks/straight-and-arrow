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
        counter2 = 0
        for (var key in scoreInput) {
            if (scoreInput.hasOwnProperty(key)){
                keyPair = [key,scoreInput[key]]
                counter++
                predictionList.push(keyPair)
            } 
            if(counter == 4){
                const tournamentIDList = predictionList.splice(3)
                const tournamentID = tournamentIDList[0][1][1]
                if(predictionList.length == 3){
                    predictionList.forEach((prediction)=> {
                        executeQuery(`INSERT INTO prediction (player, tournament, archer, pred_score) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE pred_score=VALUES(pred_score)`, 
                            [playerID, tournamentID, prediction[0], prediction[1]], (result) => {
                                counter2++
                                if(counter2 == 3){
                                    app.render('predictionSuccess.html', {}, (err, content) => {
                                        res.render('fullpage.html', {
                                                    title: "Predictions",
                                                    year: "2017",
                                                    content: content
                                        })
                                    })
                                }
                        })
                    })
                }
            }
        }   

    }

}
