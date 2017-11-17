const express = require('express');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser')
const port = 8888;
const bodyParser = require('body-parser');
const {
    check,
    validationResult
} = require('express-validator/check');
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER_ID,
    password: process.env.DB_USER_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
}
const mustacheExpress = require('mustache-express')
const app = express();
const moment = require('moment')
const bcrypt = require('bcrypt-nodejs')

//utilities
const utility = require('./util/utilities')


//model
const tournamentArcherScore = require('./data/mGetTournamentArcherScore')(executeQuery);
const tournamentArchers = require('./data/mGetTournamentArchers')(executeQuery);
const tournamentScore = require('./data/mGetTournamentScore')(executeQuery);
const tournamentStats = require('./data/mGetTournamentStats')(executeQuery);
const tabulatedResults = require('./data/mTabulateResults');
const predictions = require('./data/mGetPredictions')(executeQuery);
const allPredictions = require('./data/mAllPredictions')(executeQuery)
const archerScoreSum = require('./data/getPredictableArcherScores')(executeQuery)

//controller
const tournamentController = require('./controller/tournament-controller')(executeQuery, app, tournamentArcherScore, tabulatedResults)
const registrationController = require('./controller/registration-controller')(executeQuery, app, utility, bcrypt)
const tournamentScoreInputController = require('./controller/tournament-score-input-controller')(executeQuery, app, tournamentArchers, tournamentScore, tournamentStats, tabulatedResults)
const tournamentScoreController = require('./controller/tournament-score-controller')(executeQuery, app, tournamentArchers, tournamentScore, tournamentStats, tabulatedResults)
const tournamentPredictionResultsController = require('./controller/tournament-prediction-result-controller')(app, allPredictions, archerScoreSum, executeQuery)
const createError = require('./controller/error-Controller');
const loginController = require('./controller/login-Controller')(executeQuery, app, bcrypt);
const predictionController = require('./controller/prediction-controller')(executeQuery, app, tournamentArchers, predictions);

function run() {
    app.listen(port);
    var sessionStore = new MySQLStore(config);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.static(path.join(__dirname, './public')));
    app.use(cookieParser())
    app.use(session({
        name: 'rowans_first_cookie',
        secret: 'super_secret_cookie_business',
        cookie: { maxAge: null, expires: false },
        store: new MySQLStore(config)
    }));
    app.engine('html', mustacheExpress());
    app.set('view engine', 'mustache');
    app.set('views', __dirname + '/layouts');
    app.get('/', showIndexPage);
    app.get('/error', createError);
    app.get('/tournament', showTournamentsPage);
    app.get('/archer', showArchersList);
    app.get('/registration', registrationController.showRegistration);
    app.get('/login', loginController.showLoginPage);
    app.get('/logout', logout);
    app.get('/tournament/:tid', showArcherTournament);
    app.get('/tournament/:tid/result', tournamentScoreController.showTournamentScore);
    app.get('/tournament/:tid/prediction-result', tournamentPredictionResultsController.showPredictionResults)
    app.get('/tournament/:tid/:aid', tournamentController.showTournamentArcherScore);
    // app.get('/users', require('./usertest'));
    app.get('/admin/:tid', tournamentScoreInputController.showTournamentScoreInput);
    app.get('/prediction/:tid', predictionController.showPredictionPage);

    app.post('/capture-email', [
        check('email').isEmail().withMessage("Please enter a valid email address."),
        check('fullname').not().isEmpty().withMessage("Please enter a name.")
    ], createLog)
    app.post('/tournament-input', sendDatabaseEntry)
    app.post('/registration',registrationController.sendRegistration)
    app.post('/login',loginController.submitUserCredentials)
    app.post('/prediction-input', predictionController.sendPrediction)

}

function logout(req, res){
    req.session.destroy(function(err){
        app.render('home.html', {}, (err, content) => {
            res.render('fullpage.html', {
                title: "Welcome to IWAO",
                year: "2017",
                content: content,
                loginOptions: utility.loginOptions(false)
            })
        })
    })
}

function goodRegister(req, res) {
    res.send({
        "status": "pass",
        "message": "Thank you for registering"
    })
}

function badRegister(req, res) {
    res.send({
        "status": "fail",
        "message": "Sorry invalid details, try again"
    })
}

function createLog(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        badRegister(req, res)
    } else {
        console.log(`${req.body['email']} ----
        ${req.body['fullname']} ----from----
        ${req.headers['user-agent']}`);
        goodRegister(req, res)
    }
}

function sendDatabaseEntry(req, res) {
    endSend = []
    endInput = {}
    endInput = req.body
    counter = 0
    for (var key in endInput) {
        if (endInput.hasOwnProperty(key)){
            keyPair = [key,endInput[key]]
            endSend.push(keyPair)
        }
    }
    let tournamentIDSend = endSend.splice(31)[0][1]
    let archerIDSend = endSend.splice(30)[0][1]


    for (var arrowI in endSend){
        if (endSend.hasOwnProperty(arrowI)){

            if (endSend[arrowI][1] == 'X' || endSend[arrowI][1] == 'x'){
                endSend[arrowI][1] = 10
                endSend[arrowI].push(1)
            } else if (endSend[arrowI][1] == 'M' || endSend[arrowI][1] == 'm'){
                endSend[arrowI][1] = 0
                endSend[arrowI].push(0)
            } else {
                endSend[arrowI].push(0)
            }



            executeQuery(`INSERT INTO arrow (archer, tournament, arrow, score, spider)
            VALUES (?,?,?,?,?)
            ON DUPLICATE KEY UPDATE score=VALUES(score), spider=VALUES(spider)`,
            [archerIDSend, tournamentIDSend, endSend[arrowI][0], endSend[arrowI][1], endSend[arrowI][2]],(result) =>{
                counter++
                if (counter == 30){
                    res.redirect("/admin/"+req.body.tournamentID)
                }
            })
        }
    }
}

function showIndexPage(req, res) {
    console.log(req.session);
    app.render('home.html', {}, (err, content) => {
        res.render('fullpage.html', {
            title: "Welcome to IWAO",
            year: "2017",
            content: content,
            loginOptions: utility.loginOptions(req.session.playerID !== undefined)
        })
    })
}

function showTournamentsPage(req, res) {
    const playerID = req.session.playerID

    executeQuery(`SELECT id, venue, datetime_start, datetime_end, location, type, arrows
	FROM tournament
	ORDER BY datetime_start`, [], (result) => {
        let formattedResults = []
        let now = new Date()
        let predictionLeagueLink = ''
        result.forEach((row) => {
            if (row.datetime_start > now){
                if(req.session.email === undefined || req.session.email === ''){
                    row.status = "Upcoming"
                } else {
                    row.status = "Make-Prediction"
                    row.link = `/prediction/`+row.id
                }
            } else if (row.datetime_start <= now && row.datetime_end > now){
                row.status = "Live-Result"
                predictionLeagueLink = predictionLeagueFunction(req.session.email)
            } else {
               row.status = "Result"
               row.link = `/tournament/`+row.id+`/result`
               predictionLeagueLink = predictionLeagueFunction(req.session.email)
            }
            row.datetime_start = utility.parseDate(row.datetime_start)
            row.datetime_end = utility.parseDate(row.datetime_end)
            formattedResults.push(row)
        })

        app.render('tournament-list.html', {
            tournament_result: formattedResults,
            leagueTableLink: predictionLeagueLink
        }, (err, content) => {
            res.render('fullpage.html', {
                title: "Tournament Details",
                year: "2017",
                content: content,
                loginOptions: utility.loginOptions(req.session.playerID !== undefined)
            })
        })
    })
}

function predictionLeagueFunction (emailfromcookie){
    if(!(emailfromcookie === undefined || emailfromcookie === '')){
        predictionWrita = [
        {leagueLink: "Leaderboard"}]
        return predictionWrita
    }
     return
}

function showArchersList(req, res) {
    executeQuery(`SELECT name, country,
	(SELECT DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(dob, '%Y') -
	(DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(dob, '00-%m-%d')))
	AS age
	FROM archer
	ORDER BY name`, [], (result) => {
        app.render('archer-list.html', {
            data: result
        }, (err, content) => {
            res.render('fullpage.html', {
                title: "Archer Details",
                year: "2017",
                content: content,
                loginOptions: utility.loginOptions(req.session.playerID !== undefined)
            })
        })
    })
}

function showArcherTournament(req, res) {
    executeQuery(`SELECT archer.*
		FROM archer
		INNER JOIN tournament_archer ta
		ON archer.id = ta.archer_id
		WHERE tournament_id = ? ORDER BY name`, [req.params.tid], (archerDetail) => {
        executeQuery(`SELECT venue, datetime_start, datetime_end, type, id FROM tournament WHERE id = ?`, [req.params.tid], (tournamentDetail) => {
            let formattedResults = []
            let now = new Date()
            let predictionWriter = ''
            tournamentDetail.forEach((row) => {
                if (row.datetime_start > now){
                    row.status = "Upcoming"
                } else if (row.datetime_start <= now && row.datetime_end > now){
                    row.status = "Live-Result"
                } else {
                   row.status = "Result"
                }
                row.datetime_start = utility.parseDate(row.datetime_start)
                row.datetime_end = utility.parseDate(row.datetime_end)
                formattedResults.push(row)
            })

            function predictionWriteFunction (emailfromcookie){
                if(!(emailfromcookie === undefined || emailfromcookie === '')){
                    predictionWrita = [
                    {sentence: "Click here to predict!"},
                    {sentence2: "Click here to view the leaderboard!"}]
                    return predictionWrita
                }
                return
            }

            executeQuery(`SELECT COUNT(*) AS pbs FROM tournament_archer ta WHERE ta.tournament_id = ? AND ta.predictabool = 1`, [tournamentDetail[0].id],
                (predictaboolians)=> {
                    let predictRows = predictaboolians[0].pbs
                        if(predictRows == 3){
                            predictionWriter = predictionWriteFunction(req.session.email)
                        }

                    app.render('tournament.html', {
                        data: archerDetail,
                        tournament: formattedResults,
                        predictionSentence: predictionWriter
                    }, (err, content) => {
                        res.render('fullpage.html', {
                            title: "Archers in Tournament",
                            year: "2017",
                            content: content,
                            loginOptions: utility.loginOptions(req.session.playerID !== undefined)
                        })
                    })
            })
        })
    })
}



function executeQuery(sql, params, callback) {
    let connection = mysql.createConnection(config)
    connection.connect((err) => {
        if (err) throw err;
        connection.query(sql, params, (err, result) => {
            if (err) throw err;
            connection.destroy()
            callback(result)
        })
    })
}

run()
