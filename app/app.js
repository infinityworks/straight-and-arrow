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
	//This app-use function will use all the files in the layout folder.
	app.use(express.static(path.join(__dirname, './layouts')));
	app.get('/success', goodRegister)
	app.get('/fail', badRegister)
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

// app.use(bodyParser.urlencoded({extended: true}));
// //app.use(validator);

// app.get('/users', require('./usertest'));



// //Creates the server and listens to port 8888.
// var server = app.listen(port, function () {
//  	console.log(`Example app listening on port ${port}`);
// });