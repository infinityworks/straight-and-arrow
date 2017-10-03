const express = require('express');
const app = express();
const path = require('path');
const port = 8888;
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');

app.use(bodyParser.urlencoded({extended: true}));
//app.use(validator);

app.get('/success', function(req,res){
	res.send('thanks for submitting your interest');
});

app.get('/fail', function(req,res){
	res.send('Sorry, you have provided an invalid email/name');
});

app.get('/users', require('./usertest'));
app.post('/capture-email', [
	check('email').isEmail().withMessage("Please enter a valid email address."),
	check('fullname').not().isEmpty().withMessage("Please enter a name.")
	], function(req,res){

		const errors = validationResult(req);

		if (!errors.isEmpty()){
			console.log(errors.mapped());
			res.redirect('/fail');
		} else {
			console.log(`${req.body['email']} ---- ${req.body['fullname']} ----from---- ${req.headers['user-agent']}`);
	    	res.redirect('/success');
		}
	    
});

//This app-use function will use all the files in the layout folder.
app.use(express.static(path.join(__dirname, './layouts')));



//Creates the server and listens to port 8888.
var server = app.listen(port, function () {
 	console.log(`Example app listening on port ${port}`);
});