const express = require('express');
const path = require('path');
const mysql = require('mysql');
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


function parseDate(date) {
    let formattedDate = moment(date).format('dddd Do MMMM, YYYY')
    return formattedDate
}

function run() {
    app.listen(port);

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //Serving static code through public folder.
    app.use(express.static(path.join(__dirname, './public')));


    app.engine('html', mustacheExpress());
    app.set('view engine', 'mustache');
    app.set('views', __dirname + '/layouts');

    app.get('/', showIndexPage);
    app.get('/tournament', showTournamentsPage);

    app.get('/archer', showArchersList)
    app.get('/tournament/:tid', showArcherTournament)

    // app.get('/users', require('./usertest'));
    app.get('/admin', showAdminLogin);

    app.get('/tournament/:tid/result', showTournamentScore);
    app.get('/tournament/:tid/:aid', showTournamentArcherScore);



    app.post('/capture-email', [
        check('email').isEmail().withMessage("Please enter a valid email address."),
        check('fullname').not().isEmpty().withMessage("Please enter a name.")
    ], createLog)
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
        console.log(`${req.body['email']} ---- ${req.body['fullname']} ----from---- ${req.headers['user-agent']}`);
        goodRegister(req, res)
    }
}


function showIndexPage(req, res) {
    app.render('home.html', {}, (err, content) => {
        res.render('fullpage.html', {
            title: "Welcome to IWAO",
            year: "2017",
            content: content
        })
    })
}



function showTournamentsPage(req, res) {
    executeQuery(`SELECT id, venue, datetime_start, datetime_end, location, type, arrows
		FROM tournament
		ORDER BY datetime_start`, [], (result) => {
            let formattedResults = []
            let now = new Date()

            result.forEach((row) => {

                if (row.datetime_start > now){
                    row.status = "Upcoming"
                } else if (row.datetime_start <= now && row.datetime_end > now){
                    row.status = "Live-Result"
                } else {
                   row.status = "Result"
                }

            row.datetime_start = parseDate(row.datetime_start)
            row.datetime_end = parseDate(row.datetime_end)

            formattedResults.push(row)
            })

            app.render('tournament-list.html', {
                tournament_result: formattedResults
            }, (err, content) => {
                res.render('fullpage.html', {
                    title: "Tournament Details",
                    year: "2017",
                    content: content
                })
            })
        })
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
                content: content
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

            tournamentDetail.forEach((row) => {

                if (row.datetime_start > now){
                    row.status = "Upcoming"
                } else if (row.datetime_start <= now && row.datetime_end > now){
                    row.status = "Live-Result"
                } else {
                   row.status = "Result"
                }

                row.datetime_start = parseDate(row.datetime_start)
                row.datetime_end = parseDate(row.datetime_end)

                formattedResults.push(row)
            })
            app.render('tournament.html', {
                data: archerDetail,
                tournament: formattedResults
            }, (err, content) => {
                res.render('fullpage.html', {
                    title: "Archers in Tournament",
                    year: "2017",
                    content: content
                })
            })
        })
    })
}


function showAdminLogin(req, res) {
    app.render('admin.html', {}, (err, content) => {
        res.render('fullpage.html', {
            title: "Admin Login",
            year: "2017",
            content: content
        })
    })
}


function showTournamentArcherScore(req, res) {
    executeQuery(`SELECT arrow, score, spider
		FROM arrow arr
		INNER JOIN tournament tour
		ON arr.tournament = tour.id
		INNER JOIN archer arch
		ON arr.archer = arch.id
		WHERE arr.tournament = ? AND arr.archer = ? ORDER BY arr.arrow`, [req.params.tid, req.params.aid], (archerScore) => {
        executeQuery(`SELECT SUM(arr.score) AS total,
            SUM(arr.spider) AS spidtot,
            Count(case arr.score when 0 then null else 1 END) as Hits,
            Count(case arr.score when 0 then 1 else null END) as Misses,
            Count(case arr.score when 9 then 1 when 10 then 1 else null END) as Golds
            FROM arrow arr WHERE arr.tournament = ? AND archer = ?`, [req.params.tid, req.params.aid], (arrowTotal) => {
            let tabulatedResults = []
            let counter = 0
            let endSelection = []


            archerScore.forEach((row) => {
            	if (row.score == 0){
             		row.score = 'M'
             	}
             	if (row.spider.lastIndexOf(1) !== -1){
             	    row.score = 'X'
 				}
                counter++
                endSelection.push(row)
                if (counter % 6 == 0) {
                    tabulatedResults.push({
                        endIndex: endSelection
                    })
                    endSelection = []
                }
            })

            if (archerScore.length == 0) {
                app.render('no-info.html', {}, (err, content) => {
                    res.render('fullpage.html', {
                        title: "Information not available",
                        year: "2017",
                        content: content
                    })

                })
            } else {
                app.render('archer-score.html', {
                    data: tabulatedResults,
                    scoreSend: arrowTotal
                }, (err, content) => {
                    res.render('fullpage.html', {
                        title: "Archer Score for Tournament",
                        year: "2017",
                        content: content
                    })
                })
            }
        })
    })
}

function showTournamentScore(req, res) {
    let tournamentScores = []
    executeQuery(`SELECT archer_id, archer.name
        FROM tournament_archer
        INNER JOIN archer ON archer_id = archer.id
        WHERE tournament_id = ?`,
        [req.params.tid], (archerIDs) =>{
        archerIDs.forEach((archerID)=>{
            executeQuery(`SELECT arrow, score, spider
                FROM arrow arr
                WHERE arr.tournament = ? AND arr.archer = ? ORDER BY arr.arrow`, [req.params.tid, archerID.archer_id], (singleArcherData) => {
                        executeQuery(`SELECT SUM(arr.score) AS total,
                            SUM(arr.spider) AS spidtot,
                            Count(case arr.score when 0 then null else 1 END) as Hits,
                            Count(case arr.score when 9 then 1 when 10 then 1 else null END) as Golds
                            FROM arrow arr WHERE arr.tournament = ? AND arr.archer = ?`, [req.params.tid, archerID.archer_id], (singleArcherScore) => {
                                let archer = []
                                archer.id = archerID
                                archer.ends = tabulateResult(singleArcherData)
                                archer.summary = singleArcherScore
                                tournamentScores.push(archer)

                                if (archerIDs.length == tournamentScores.length){
                                    app.render('tournament-score.html', {
                                        data: tournamentScores,
                                    }, (err, content) => {
                                        res.render('fullpage.html', {
                                            title: "Archer Score for Tournament",
                                            year: "2017",
                                            content: content
                                    })
                                })
                            }
                        })
                })
        })
    })
}

function tabulateResult(archerScore){
    let tabulatedResults = []
    let counter = 0
    let endSelection = []


    archerScore.forEach((row) => {
        if (row.score == 0){
            row.score = 'M'
        }
        if (row.spider.lastIndexOf(1) !== -1){
            row.score = 'X'
        }
        counter++
        endSelection.push(row)
        if (counter % 6 == 0) {
            tabulatedResults.push({
                endIndex: endSelection
            })
            endSelection = []
        }

    })

    return tabulatedResults
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
