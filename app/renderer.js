

module.exports = (app) => {

    return { render };

    function render(res, template, config) {

        console.log('renderer preparing', { template });

        let title = config.title || 'Straight and Arrow';
        let year = config.year || '2017';

        app.render(template, config, (err, content) => {
            res.render('fullpage.html', {
                title: title,
                year: year,
                content: content
            });
        })

    }
};
