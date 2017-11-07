module.exports = (executeQuery, app, utility, bcrypt) => {

    return {
        showRegistration,
        sendRegistration,
        checkEmailsMatch,
        checkEmailUnique,
        checkPasswordsMatch,
        checkPasswordPolicy,
        checkPasswordLength
    };

    function showRegistration(req, res) {
        app.render('registration.html', {
        }, (err, content) => {
            res.render('fullpage.html', {
                title: "Registration",
                year: "2017",
                content: content
            })
        })
    }

    function sendRegistration(req, res) {
        regInput = req.body
        const saltRounds = 10;
        
        passwordsMatch = checkPasswordsMatch(regInput.password, regInput.cpassword)
        emailsMatch = checkEmailsMatch(regInput.email, regInput.cemail)
        passwordPolicy = checkPasswordPolicy(regInput.password)

        if (!passwordsMatch || !emailsMatch || !passwordPolicy) {
            throw 403;
        }
        
        checkEmailUnique(regInput.email, (emailUnique) => {

            if (!emailUnique) {
                app.render('emailNotUnique.html', {}, (err, content) => {
                    res.render('fullpage.html', {
                        title: "Archer Score for Tournament",
                        year: "2017",
                        content: content
                    })
                })
                return
            }
            bcrypt.hash(regInput.password, null, null, function(err, hash) {
                    executeQuery(`INSERT INTO player (name, email, password)
                    VALUES (?,?,?)`, [regInput.name, regInput.email, hash], (result) => {
                        app.render('registrationSuccess.html', {}, (err, content) => {
                            res.render('fullpage.html', {
                                title: "Archer Score for Tournament",
                                year: "2017",
                                content: content
                            })
                        })
                    })
                });
        })
    }



    function checkPasswordsMatch(pass, cpass) {
        return utility.checkCredentialsMatch(pass, cpass)
    }

    function checkEmailsMatch(email, cemail) {
        return utility.checkCredentialsMatch(email, cemail)
    }

    function checkEmailUnique(email, callback) {

        executeQuery(`SELECT count(*) as count from player where email = ?`, [email], (number) => {
    
            callback(number[0].count == 0)
        })

    }

    function checkPasswordPolicy(pass) {
        return checkPasswordLength(pass)
    }

    function checkPasswordLength(password) {
        if (password.length < 8 || password.length > 20) {
            return false
        } else {
            return true
        }
    }
}
