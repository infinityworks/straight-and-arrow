module.exports = (executeQuery) => {

    return { getPredictions }

    function getPredictions(sessionID, tournamentID, callback) {
	    executeQuery(`SELECT a.id, a.name, p.player, p.pred_score FROM tournament_archer ta
		INNER JOIN archer a on ta.archer_id = a.id
		LEFT OUTER JOIN prediction p on ta.archer_id = p.archer AND p.player = 1 AND p.tournament = 1
		WHERE ta.predictabool = 1 AND ta.tournament_id = ?`,
	        [tournamentID, sessionID], (predictions) =>{
	        	callback(predictions)
		})
	//this should return an array of predictions
	}
}
