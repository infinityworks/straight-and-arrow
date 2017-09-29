const express = require('express');
const app = express();
const path = require('path');
const port = 8888;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


app.get('/success', function(req,res){
	res.send('thanks for submitting your interest')
})

app.get('/users', require('./usertest'))
app.post('/capture-email', function(req,res){
    console.log(req.body)
    res.redirect('/success')
})

//This app-use function will use all the files in the layout folder.
app.use(express.static(path.join(__dirname, './layouts')))

//Creates the server and listens to port 8888.
var server = app.listen(port, function () {
 	console.log(`Example app listening on port ${port}`)
})