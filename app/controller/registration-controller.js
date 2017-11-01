module.exports = (executeQuery, app, utility) => {

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
        
    }   


    function checkPasswordsMatch(pass, cpass) {
        utility.checkCredentialsMatch(pass, cpass)
    }

    function checkEmailsMatch(pass, cpass) {
        utility.checkCredentialsMatch(pass, cpass)
    }

    function registration(playerInformation) {
    let name = playerInformation.name // body...
}






}
