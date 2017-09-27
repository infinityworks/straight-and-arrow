var http = require('http');
var connect_db = false
var RETRY_TIME = 1000
var mysql      = require('mysql');
var USER_ID = process.env.USER_ID
var USER_PW = process.env.USER_PW
var HOST_DB = process.env.HOST_DB
var connection



function connectToDB(){
	if(connect_db == false){
    connection = mysql.createConnection({
      host     : HOST_DB,
      user     : USER_ID,
      password : USER_PW
    });
    console.log('trying to connect')
		connection.connect(function(err) {
  			if (err) {
  				setTimeout(connectToDB, RETRY_TIME);
          console.log(`failed using id: ${USER_ID}, host: ${HOST_DB}, pw: ${USER_PW} : ${err.message}`);
          return;
        }else{
    			connect_db = true
          console.log('connected as id ' + connection.threadId);
    		}
    });
  } 
}


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (connect_db == false){
    	res.end('Can\'t connect to db')
    }
    else{
    	res.end('Connected to db')
    }
    
}).listen(8888);

connectToDB()