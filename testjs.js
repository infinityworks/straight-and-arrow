var http = require('http');
var connected = '<html><img src="https://ak1.picdn.net/shutterstock/videos/646681/thumb/6.jpg" alt="hit the bullseye"></html>';
var notConnected = '<html><img src="http://jewishjournal.com/images/bullseye.jpg" alt="missed the bullseye"></html>';
var connect_db = false;
var RETRY_TIME = 1000;
var mysql      = require('mysql');

var USER_ID = process.env.USER_ID
var USER_PW = process.env.USER_PW
var HOST_DB = process.env.HOST_DB
var connection
var dbError;


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
          dbError = err.message;
  				setTimeout(connectToDB, RETRY_TIME);
          console.log(`failed using id: ${USER_ID}, host: ${HOST_DB}, pw: ${USER_PW} : ${err.message}`);
          return;
        }else{
    			connect_db = true;
          console.log('connected as id ' + connection.threadId);
    		}
    });
  } 
}


http.createServer(function (req, res) {
    console.log(`${req.method}--- from ---${req.headers['user-agent']}--- on ---${req.url}`)
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (connect_db == false){
      res.write(dbError);
    	res.end(notConnected);
    }
    else{
    	res.end(connected);
    }
    
}).listen(8888);


connectToDB();
