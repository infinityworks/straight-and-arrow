module.exports = (executeQuery, app, utility) => {

    return { showRegistration, sendRegistration, checkEmailsMatch, 
        checkEmailUnique, checkPasswordsMatch, checkPasswordPolicy , 
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

        regInput = req.body

        if (!checkPasswordsMatch(regInput.password, regInput.cpassword)){
            res.send({"status": "passwordsNotMatch"})
        }
        else if (!checkEmailsMatch(regInput.email, regInput.cemail)){
            res.send({"status": "emailsNotMatch"})
        }
        else if (!checkEmailUnique(regInput.email)){
            res.send({"status": "emailTaken"})
        }
        else if (!checkPasswordPolicy(regInput.password)) {
            res.send({"status": "invalidPassword"})
        }
        else {
            app.render('registrationSuccess.html', {}, (err, content) => {
                res.render('fullpage.html', {
                            title: "Archer Score for Tournament",
                            year: "2017",
                            content: content
                })
            })
        }

    }


    function checkPasswordsMatch(pass, cpass) {
        return utility.checkCredentialsMatch(pass, cpass)
    }

    function checkEmailsMatch(email, cemail) {
        return utility.checkCredentialsMatch(email, cemail)
    }

    function checkEmailUnique(email){
        return true
        // select count(*) from table where email = email
        // if 0 it's unique, if 1 not unique
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

    // add DOB check?

}
