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
        
    }




}
