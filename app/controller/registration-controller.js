module.exports = (executeQuery, app) => {

    return { showRegistration, sendRegistration };

    function showRegistration(req, res) {
    

        app.render('registration.html', {

        }, (err, content) => {
            res.render('fullpage.html', {
                title: "Archer Score for Tournament",
                year: "2017",
                content: content
            })
        })

        
    }

    function sendRegistration(req, res) {
   
        regInput = req.body
        console.log(regInput)
        // //DO CHECKS ON INPUT, returns TRUE or FALSE
        // checkEmailFieldsMatch(email,cemail){

        // }



                // executeQuery(`INSERT INTO arrow (archer, tournament, arrow, score, spider)
                // VALUES (?,?,?,?,?)
                // ON DUPLICATE KEY UPDATE score=VALUES(score), spider=VALUES(spider)`,
                // [archerIDSend, tournamentIDSend, endSend[arrowI][0], endSend[arrowI][1], endSend[arrowI][2]],(result) =>{
                //     counter++
                //     if (counter == 30){
                //         res.redirect("/admin/"+req.body.tournamentID)
                //     }
                // })
        // else
        //     return to page with sad message            
        
    }   
    







}