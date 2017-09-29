const express = require('express');
const app = express();
const path = require('path');
const port = 8888;

//This app-use function will use all the files in the layout folder.
app.use(express.static(path.join(__dirname, './layouts')))

//Creates the server and listens to port 8888.
var server = app.listen(port, function () {
 	console.log(`Example app listening on port ${port}`)
})