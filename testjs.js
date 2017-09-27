var http = require('http');
var connect_db = false
var RETRY_TIME = 1000
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  password : 'example'
});



function connectToDB(){
	if(connect_db == false){
		connection.connect(function(err) {
  			if (err) {
  				setTimeout(connectToDB, RETRY_TIME);
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
