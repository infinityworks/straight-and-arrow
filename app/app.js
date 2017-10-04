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
const mustacheExpress = require('mustache-express')
const app = express();
let date = new Date();


function run(){
	app.listen(port);

	app.use(bodyParser.urlencoded({extended: true}));

	//Serving static code through public folder.
	app.use(express.static(path.join(__dirname, './public')));


	app.engine('html', mustacheExpress());
	app.set('view engine', 'mustache');
	app.set('views', __dirname + '/layouts');

	app.get('/', showIndexPage);
	app.get('/success', goodRegister);
	app.get('/fail', badRegister);
	// app.get('/users', require('./usertest'));

	app.post('/capture-email', [
		check('email').isEmail().withMessage("Please enter a valid email address."),
		check('fullname').not().isEmpty().withMessage("Please enter a name.")
	], createLog)
}


function goodRegister(req,res){
	app.render('home.html', {submitMessage: "Thank you for registering."}, (err,content)=>{
		res.render('fullpage.html', {title:"Welcome to IWAO", year:date.getFullYear(), content: content})
	})
}


function badRegister(req,res){
	app.render('home.html', {submitMessage: "Sorry invalid details, try again"}, (err,content)=>{
		res.render('fullpage.html', {title:"Welcome to IWAO", year:date.getFullYear(), content: content})
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
		res.render('fullpage.html', {title:"Welcome to IWAO", year:date.getFullYear(), content: content})
	})
}

function showArchersPage(req, res){
	app.render('home.html', {}, (err,content)=>{
		res.render('fullpage.html', {title:"Welcome to IWAO", year:date.getFullYear(), content: content})
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




