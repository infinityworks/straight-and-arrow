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
    

    }    
    
}