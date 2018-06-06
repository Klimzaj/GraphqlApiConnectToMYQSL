import mysql from 'mysql';

import Pass from '../pass'

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : Pass.dbLog,
    password : Pass.dbPassword,
    database : Pass.dbName
});

try {
    console.log('zalogowany');
    connection.connect();
} catch(e) {
    console.log('Database Connection failed:' + e);
}

module.exports = connection;