module.exports = (executeQuery, app, tournamentArchers, tournamentScore, tournamentStats, tabulatedResults) => {

   return { showTournamentScore };




    function showTournamentScore(req, res) {

        const tournamentID = req.params.tid;
        const archerID = req.params.aid;
        let tournamentScores = []


        tournamentArchers.getTournamentArchers(tournamentID, archerID, (archerIDs) => {
            console.log("Archer IDs",  archerIDs);
            
            archerIDs.forEach((archerID)=>{
                tournamentScore.getTournamentScore(tournamentID, archerID.archer_id, (archerData) => {
                console.log("Archer Data",  archerData);

                tournamentStats.getTournamentStats(tournamentID, (archerStats) => {

                    tournamentScores.push(tabulatedResults(archerData))
                    console.log("Tournament Scores", tournamentScores)



                    //stolen from app.js
                    // let archer = []
                    // archer.id = archerID
                    // archer.ends = tabulateResult(singleArcherData)
                    // archer.summary = singleArcherScore
                    // tournamentScores.push(archer)

                    // if (archerIDs.length == tournamentScores.length){
                        app.render('tournament-score.html', {
                            data: tournamentScores,
                        }, (err, content) => {
                            res.render('fullpage.html', {
                                title: "Archer Score for Tournament",
                                year: "2017",
                                content: content
                            })
                        })
                    //}
                    //stolen from app js

                    
                    console.log("Archer stats", archerStats);

                })    

            })
            })        
            
        })    
    }
}