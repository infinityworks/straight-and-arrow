module.exports = (executeQuery) => {

    return { getPredictions }

    function getPredictions(sessionID, tournamentID, callback) {
	    executeQuery(`SELECT pred_no, player, tournament, archer, pred_score FROM prediction
            WHERE tournament = ? AND player = ?`,
	        [tournamentID, sessionID], (predictions) =>{
	        	callback(predictions)
		})
	//this should return an array of predictions
	}
}
