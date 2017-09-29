module.exports = function(req, res){
    var mysql   = require('mysql');
    var USER_ID = process.env.USER_ID;
    var USER_PW = process.env.USER_PW;
    var HOST_DB = process.env.HOST_DB;

    connection = mysql.createConnection({
        host     : HOST_DB,
        user     : USER_ID,
        password : USER_PW
    });

    connection.connect(function(err) {
        if (err) {
            console.log(`failed using id: ${USER_ID}, host: ${HOST_DB},: ${err.message}`);
            return;
        }
        connection.query("SELECT * FROM arrowdb.user", function(err, result){
            let respo = result.map(function(row){
                return `${row.id}, ${row.name}, ${row.email} <br>`
            })
            res.end('<html>'+respo.join('')+'</html>')
        })
    });
}

