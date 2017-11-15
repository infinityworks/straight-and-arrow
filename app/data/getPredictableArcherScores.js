module.exports = (executeQuery) => {

    return { getPredictableArcherScoreSum }

    function getPredictableArcherScoreSum(tournamentID, callback) {
	    executeQuery(`SELECT arr.archer, SUM(arr.score) AS score
                    FROM arrow arr
                    INNER JOIN tournament_archer ta on ta.archer_id = arr.archer AND ta.tournament_id = 4
                    WHERE arr.tournament = ? AND ta.predictabool = 1
                    GROUP BY arr.archer`,
	        [tournamentID], (predictions) =>{
	        	callback(predictions)
		})
	//this should return an array of predictions
	}
}
