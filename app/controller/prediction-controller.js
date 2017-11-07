module.exports = (executeQuery, app) => {

   return { showPredictionPage };

    function showPredictionPage(req, res) {

        app.render('prediction.html', {}, (err, content) => {
            res.render('fullpage.html', {
                title: "Prediction Page",
                year: "2017",
                content: content
            })
        })
    }
}
