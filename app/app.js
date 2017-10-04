const express = require('express');
const path = require('path');
const port = 8888;
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');
const config = {
	host: "127.0.0.1", //environment variable?
	user: "root",
	password: "example",
	port: 3306,
	// This is needed to direct to the database.
	database: "arrowdb"
}

function run(){
	const app = express();
	
	app.listen(port)

	app.use(express.static(path.join(__dirname, './layouts')));
	app.use(bodyParser.urlencoded({extended: true}));

	app.get('/success', goodRegister)
	app.get('/fail', badRegister)
	// app.get('/users', require('./usertest'));

	app.post('/capture-email', [
		check('email').isEmail().withMessage("Please enter a valid email address."),
		check('fullname').not().isEmpty().withMessage("Please enter a name.")
	], createLog)
}


function goodRegister(req,res){
	res.send('thanks for submitting your interest');
}


function badRegister(req,res){
	res.send('Sorry, you have provided an invalid email/name');
}


function createLog(req,res){
	const errors = validationResult(req);

		if (!errors.isEmpty()){
			console.log(errors.mapped());
			res.redirect('/fail');
		} else {
			console.log(`${req.body['email']} ---- ${req.body['fullname']} ----from---- ${req.headers['user-agent']}`);
	    	res.redirect('/success');
		}
}

run()




