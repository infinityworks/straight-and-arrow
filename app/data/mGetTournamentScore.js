module.exports = (executeQuery) => {

    return { getTournamentScore }

    function getTournamentScore(tournamentID, callback){ 
		
        executeQuery(`SELECT arrow, score, spider
            FROM arrow arr
            WHERE arr.tournament = ? ORDER BY arr.arrow`, 
            [tournamentID], (archerData) => {
            	callback(archerData)
            })
    	}
}