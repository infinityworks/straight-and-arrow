module.exports = (executeQuery, app, bcrypt) => {

    return {
        showLoginPage,
        submitUserCredentials
    };

    function showLoginPage(req, res) {
        app.render('login.html', {
        }, (err, content) => {
            res.render('fullpage.html', {
                title: "Registration",
                year: "2017",
                content: content
            })
        })
    }

    function submitUserCredentials(req, res) {

        email = req.body.email
        password = req.body.password

        executeQuery(`SELECT id, name, password FROM player WHERE email = ?`, [email], (result) => {
            if(result.length == 0){
                res.send({status: "email doesn't exist"})
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
                        res.send({status: "wrong password"})
                    }
                })
            }

        })




    }




}
