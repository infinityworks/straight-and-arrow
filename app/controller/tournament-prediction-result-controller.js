module.exports = (app, allPredictions, archerScoreSum) =>{

    return {showPredictionResults};

    function showPredictionResults(req, res){
        const tournamentID = req.params.tid

        archerScoreSum.getPredictableArcherScoreSum(tournamentID, (archerScoreSum)=>{
            allPredictions.getAllPredictions(tournamentID, (allPrediction) =>{
            playerScores = []
            mustachePlayerScore = []
                for (var i = 0; i < allPrediction.length; i++){

                    prediction = allPrediction[i]

                    player_name = prediction.name
                    player_ID = prediction.id
                    archer_ID = prediction.archer
                    predictedScore = prediction.pred_score
                    archer_score = getArcherScore(archerScoreSum, archer_ID)
                    diff = Math.abs(predictedScore - archer_score)

                    if (!playerScores[player_ID]){
                        playerScores[player_ID] = {name:player_name, predictionDiff:0}
                    }
                    playerScores[player_ID].predictionDiff += diff;
                }

                playerScores.sort(function(a, b) {
                return parseFloat(a.predictionDiff) - parseFloat(b.predictionDiff);
                });


                for (var i=0; i < (playerScores.length-1); i++) {
                    playerScores[i].rank = i+1
                    playerObject = playerScores[i]
                    mustachePlayerScore.push({playerInfo: playerObject})
                }


                app.render('display-prediction-results.html',
                    {playerScores: mustachePlayerScore}
                , (err, content) => {
                    res.render('fullpage.html', {
                        title: "League Table",
                        year: "2017",
                        content: content
                })
            })
            })
        })
    }

    function getArcherScore(archerScoreSum, archer_ID){
        for (var i = 0; i < archerScoreSum.length; i++){
            row = archerScoreSum[i]
            if (row.archer == archer_ID){
                return row.score;
            }
        }
        return null;
    }
}
