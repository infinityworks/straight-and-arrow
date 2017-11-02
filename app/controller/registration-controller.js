module.exports = (executeQuery, app, utility) => {

    return { showRegistration, sendRegistration, checkEmailsMatch, 
        checkEmailsUnique, checkPasswordsMatch, checkPasswordPolicy , 
        checkPasswordLength };

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

        // regInput = req.body
        // checkPasswordsMatch()
        // checkEmailsMatch()
        // checkEmailUnique()
        // checkPasswordPolicy()

        app.render('registrationSuccess.html', {
        }, (err, content) => {
            res.render('fullpage.html', {
                title: "Archer Score for Tournament",
                year: "2017",
                content: content
            })
        })


    }


    function checkPasswordsMatch(pass, cpass) {
        return utility.checkCredentialsMatch(pass, cpass)
    }

    function checkEmailsMatch(email, cemail) {
        return utility.checkCredentialsMatch(email, cemail)
    }

    function checkEmailsUnique(){
        return true
    }

    function checkPasswordPolicy(pass){
        return checkPasswordLength(pass)
    }

    function checkPasswordLength(password){
        if (password.length <8 || password.length >20){
            return false
        }
        else {
            return true
        }
    }

}
