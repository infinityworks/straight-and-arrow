module.exports = (executeQuery) => {

    return { getTournamentStats }

    function getTournamentStats(tournamentID, callback){
		executeQuery(`SELECT SUM(arr.score) AS total,
		    SUM(arr.spider) AS spidtot,
		    Count(case arr.score when 0 then null else 1 END) as Hits,
		    Count(case arr.score when 9 then 1 when 10 then 1 else null END) as Golds
		    FROM arrow arr WHERE arr.tournament = ?`, 
		    [tournamentID], (archerStats) => {

		    	callback(archerStats)
		})
	}
}