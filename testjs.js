var http = require('http');
var connected = '<html><img src="https://ak1.picdn.net/shutterstock/videos/646681/thumb/6.jpg" alt="hit the bullseye"></html>';
var notConnected = '<html><img src="http://jewishjournal.com/images/bullseye.jpg" alt="missed the bullseye"></html>';
var connect_db = false;
var RETRY_TIME = 1000;
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  password : 'example'
});
 var dbError;

function connectToDB(){
	if(connect_db == false){
		connection.connect(function(err) {
  			if (err) {
          dbError = err.message;
  				setTimeout(connectToDB, RETRY_TIME);
          return;
        }else{
    			connect_db = true;
          console.log('connected as id ' + connection.threadId);
    		}
    });
  } 
}


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (connect_db == false){
      res.send(dbError);
    	res.end(notConnected);
    }
    else{
    	res.end(connected);
    }
    
}).listen(8888);

connectToDB();
