module.exports = (executeQuery, app) => {

   return { showTournamentScoreInput };

	function showTournamentScoreInput(req, res) {
	    app.render('score-input.html', {}, (err, content) => {
	         res.render('fullpage.html', {
	            title: "Score Input",
	            year: "2017",
	            content: content
	        })

	    })
	}


	
}