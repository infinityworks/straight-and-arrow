module.exports = (executeQuery) => {

    return { getPredictions }

    function getPredictions(playerID, tournamentID, callback) {
	    executeQuery(`SELECT a.id, a.name, p.player, p.pred_score FROM tournament_archer ta
		INNER JOIN archer a on ta.archer_id = a.id
		LEFT OUTER JOIN prediction p on ta.archer_id = p.archer AND p.player = ? AND p.tournament = ?
		WHERE ta.predictabool = 1 AND ta.tournament_id = ?`,
	        [playerID, tournamentID, tournamentID], (predictions) =>{
	        	callback(predictions)
		})
	//this should return an array of predictions
	}
}
