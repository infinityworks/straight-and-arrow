module.exports = (executeQuery) => {

    return { getAllPredictions }

    function getAllPredictions(tournamentID, callback) {
	    executeQuery(`SELECT  pl.id, pl.name, p.archer, p.pred_score FROM tournament_archer ta
		INNER JOIN prediction p on ta.archer_id = p.archer AND p.tournament = ?
		INNER JOIN player pl on p.player = pl.id
		WHERE ta.predictabool = 1 AND ta.tournament_id = ?
        ORDER BY p.player`,
	        [tournamentID, tournamentID], (predictions) =>{
	        	callback(predictions)
		})
	//this should return an array of predictions
	}
}
