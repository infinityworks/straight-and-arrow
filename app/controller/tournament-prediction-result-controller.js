module.exports = (app, allPredictions, archerScoreSum) =>{

    return {showPredictionResults};

    function showPredictionResults(req, res){
        const tournamentID = req.params.tid

        archerScoreSum.getPredictableArcherScoreSum(tournamentID, (archerScoreSum)=>{
            allPredictions.getAllPredictions(tournamentID, (allPrediction) =>{
            playerScore = {}
            mustachePlayerScore = []
                for (var i = 0; i < allPrediction.length; i++){
                    prediction = allPrediction[i]
                    player_name = prediction.name
                    player_ID = prediction.id
                    archer_ID = prediction.archer
                    prediction = prediction.pred_score
                    archer_score = getArcherScore(archerScoreSum, archer_ID)
                    console.log("prediction",prediction)
                    console.log("archer_score", archer_score)
                    diff = Math.abs(prediction - archer_score)
                    console.log(diff)
                    if (!playerScore[player_ID]){
                        playerScore[player_ID] = {name:player_name, rankingScore:0}
                    }
                    playerScore[player_ID].rankingScore += diff;
                    console.log("playerScore", playerScore)
                }
                for (var key in playerScore){
                    mustachePlayerScore.push({diff:playerScore[key]})
                }


                console.log(mustachePlayerScore)
                app.render('display-prediction-results.html',
                    {playerScore: mustachePlayerScore}
                , (err, content) => {
                    res.render('fullpage.html', {
                        title: "Archer Scores for Tournament",
                        year: "2017",
                        content: content
                })
            })
            })
        })
    }

    function getArcherScore(archerScoreSum, archer_ID){
        console.log("passed archerscoresum", archerScoreSum)
        console.log("passed archer id", archer_ID)
        for (var i = 0; i < archerScoreSum.length; i++){
            row = archerScoreSum[i]
            if (row.archer == archer_ID){
                return row.score;
            }
        }
        return null;
    }
}
