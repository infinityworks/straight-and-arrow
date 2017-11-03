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
        emailUnique = checkEmailUnique(regInput.email)
        passwordPolicy = checkPasswordPolicy(regInput.password)

        if (!passwordsMatch || !emailsMatch || !passwordPolicy) {
            throw 403;
        }
        if (!emailUnique) {
            app.render('emailNotUnique.html', {}, (err, content) => {
                res.render('fullpage.html', {
                    title: "Archer Score for Tournament",
                    year: "2017",
                    content: content
                })
            })
        }

        bcrypt.hash(regInput.password, null, null, function(err, hash) {
          executeQuery(`INSERT INTO player (name, dob, email, password)
          VALUES (?,?,?,?)`, [regInput.name, regInput.dob, regInput.email, hash], (result) => {
            app.render('registrationSuccess.html', {}, (err, content) => {
                res.render('fullpage.html', {
                    title: "Archer Score for Tournament",
                    year: "2017",
                    content: content
                })
            })
          })
        });

        
    }



    function checkPasswordsMatch(pass, cpass) {
        return utility.checkCredentialsMatch(pass, cpass)
    }

    function checkEmailsMatch(email, cemail) {
        return utility.checkCredentialsMatch(email, cemail)
    }

    function checkEmailUnique(email) {
        return true
        // select count(*) from table where email = email
        // if 0 it's unique, if 1 not unique
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
