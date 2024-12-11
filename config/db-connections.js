const mysql = require('mysql2');

const db_config =
{
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PWD,
    database: process.env.MYSQL_DB_DBNAME
    // ssl : {
    //     rejectUnauthorized: false
    //   }
};


function handleDisconnect() {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    try {
        con.on('error', function (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();
            } else {
                throw err;
            }
        });
        return con
    } catch (error) {
       con.end()
       handleDisconnect(); 
    }
    
    
}


module.exports = { handleDisconnect }