const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys.js');
const { createClient } = require('@libsql/client');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err === 'PROTOCOLE_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err === 'ERR_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTION');
        }
        if (err === 'ENCONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log("DB is connected");
    return;
});

// pool query
pool.query = promisify(pool.query);

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
})

module.exports = {
    pool,
    client
};