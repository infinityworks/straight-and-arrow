module.exports = (executeQuery) => {

    return { getTournamentScore }

    function getTournamentScore(tournamentID, archerID, callback){ 
		console.log(tournamentID, archerID)
        executeQuery(`SELECT arrow, score, spider
            FROM arrow arr
            WHERE arr.tournament = ? and arr.archer = ?`, 
            [tournamentID, archerID], (archerData) => {
            	callback(archerData)
            })
    	}
}