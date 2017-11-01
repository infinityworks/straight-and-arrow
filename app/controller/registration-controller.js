module.exports = (executeQuery, app, utility) => {

    return { showRegistration, sendRegistration, checkEmailsMatch, checkEmailUnique, checkPasswordsMatch, checkPasswordPolicy };

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
        checkPasswordsMatch()
        checkEmailsMatch()
        checkEmailUnique()
        checkPasswordPolicy()
    }


    function checkPasswordsMatch(pass, cpass) {
        utility.checkCredentialsMatch(pass, cpass)
    }

    function checkEmailsMatch(email, cemail) {
        utility.checkCredentialsMatch(email, cemail)
    }

    function checkEmailsUnique(){
        
    }

    function checkPasswordPolicy(pass){
        checkPasswordLength()
    }

    function checkPasswordLength(password){
        if (password.length <8 || >20){
            console.log(“Password isn’t the correct length”);
        }
        else {
            return password
        }
    }

}
