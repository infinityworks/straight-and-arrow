module.exports = (executeQuery) => {

    return { getTournamentArchers }

    function getTournamentArchers(tournamentID, archerID, callback) {
    
	    executeQuery(`SELECT archer_id, archer.name
	        FROM tournament_archer
	        INNER JOIN archer ON archer_id = archer.id
	        WHERE tournament_id = ?`,
	        [tournamentID], (archerIDs) =>{
	        	callback(archerIDs)	        
		})

	//this should return an array of archer ids
	}
}