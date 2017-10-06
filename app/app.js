const express = require('express');
const path = require('path');
const mysql = require('mysql');
const port = 8888;
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');
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


function parseDate(date){
	let formattedDate = moment(date).format('dddd Do MMMM, YYYY')
	return formattedDate
}

function run(){
	app.listen(port);

	app.use(bodyParser.urlencoded({extended: true}));

	//Serving static code through public folder.
	app.use(express.static(path.join(__dirname, './public')));


	app.engine('html', mustacheExpress());
	app.set('view engine', 'mustache');
	app.set('views', __dirname + '/layouts');

	app.get('/', showIndexPage);
	app.get('/tournament', showTournamentsPage);
	app.get('/archer', showArchersList)
	app.get('/tournament/:id', showArcherTournament)
	// app.get('/users', require('./usertest'));

	app.post('/capture-email', [
		check('email').isEmail().withMessage("Please enter a valid email address."),
		check('fullname').not().isEmpty().withMessage("Please enter a name.")
	], createLog)
}


function goodRegister(req,res){
	app.render('home.html', {submitMessage: "Thank you for registering."}, (err,content)=>{
		res.render('fullpage.html', {title:"Thank you", year:"2017", content: content})
	})
}


function badRegister(req,res){
	app.render('home.html', {submitMessage: "Sorry invalid details, try again"}, (err,content)=>{
		res.render('fullpage.html', {title:"Incorrect details", year:"2017", content: content})
	})
}


function createLog(req,res){
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		console.log(errors.mapped());
		badRegister(req,res)
	} else {
		console.log(`${req.body['email']} ---- ${req.body['fullname']} ----from---- ${req.headers['user-agent']}`);
    	goodRegister(req,res)
	}
}


function showIndexPage(req, res){
	app.render('home.html', {}, (err,content)=>{
		res.render('fullpage.html', {title:"Welcome to IWAO", year:"2017", content: content})
	})
}



function showTournamentsPage(req, res){
	executeQuery(`SELECT id, venue, datetime_start, datetime_end, location, type, arrows 
		FROM tournament 
		WHERE datetime_end > now() 
		ORDER BY datetime_end`, (result) =>{
		let formattedResults = []

		result.forEach((row)=> {

			row.datetime_start = parseDate(row.datetime_start)
			row.datetime_end  = parseDate(row.datetime_end)

			formattedResults.push(row)
		})

		app.render('tournament-list.html', {tournament_result:formattedResults}, (err,content)=>{
			res.render('fullpage.html', {title:"Tournament Details", year:"2017", content: content})
		})
	})
}

function showArchersList(req, res){
	executeQuery(`SELECT name, country, 
		(SELECT DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(dob, '%Y') - 
		(DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(dob, '00-%m-%d'))) 
		AS age 
		FROM archer 
		ORDER BY name`, (result) => {
		app.render('archer-list.html', {data: result}, (err,content)=>{
			res.render('fullpage.html', {title:"Archer Details", year:"2017", content: content})

		})
	})
}

function showArcherTournament(req, res){
	executeQuery(`SELECT archer.* 
		FROM archer 
		INNER JOIN tournament_archer ta 
		ON archer.id = ta.archer_id
		WHERE tournament_id = 1`, (result) => {
		app.render('archer-list.html', {data: result}, (err,content)=>{
			res.render('fullpage.html', {title:"Archers in Tournament", year:"2017", content: content})

		})
	})
}

function executeQuery(sql, callback) {
	let connection = mysql.createConnection(config)
	connection.connect((err) => {
    	if (err) throw err;

		connection.query(sql, (err, result) => {
      		if (err) throw err;

    		connection.destroy()
    		callback(result)
    	})
	})
}

run()




