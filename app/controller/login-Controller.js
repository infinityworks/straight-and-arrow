const utility = require('../util/utilities');

module.exports = (executeQuery, app, bcrypt) => {

    return {
        showLoginPage,
        submitUserCredentials
    };

    function showLoginPage(req, res) {
        app.render('login.html', {
        }, (err, content) => {
            res.render('fullpage.html', {
                title: "Login",
                year: "2017",
                content: content,
                loginOptions: utility.loginOptions(req.session.playerID !== undefined)
            })
        })
    }

    function submitUserCredentials(req, res) {

        var email = req.body.email
        var password = req.body.password

        executeQuery(`SELECT id, name, password FROM player WHERE email = ?`, [email], (result) => {
            if(result.length == 0){
                app.render('loginFailure.html', {}, (err, content) => {
                    res.render('fullpage.html', {
                        title: "Login",
                        year: "2017",
                        content: content,
                        loginOptions: utility.loginOptions(req.session.playerID !== undefined)
                    })
                })
            }
            else {
                bcrypt.compare(password, result[0].password, (err, match) => {
                    if(match) {
                        req.session.email = email
                        req.session.playerID = result[0].id
                        req.session.name = result[0].name
                        res.redirect("/tournament")
                    }
                    else {
                        app.render('loginFailure.html', {}, (err, content) => {
                            res.render('fullpage.html', {
                                title: "Login",
                                year: "2017",
                                content: content,
                                loginOptions: utility.loginOptions(req.session.playerID !== undefined)
                            })
                        })
                    }
                })
            }
        })
    }
}
