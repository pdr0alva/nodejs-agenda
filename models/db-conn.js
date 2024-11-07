"use strict"

const mysql = require('mysql2');

const pool = mysql.createPool
({
	host: 'localhost',
	user: 'root',
	password: '.pdr__0//',
	database: 'API_TEST',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

pool.getConnection((e, conn) =>
{
	if (e)
	{
		console.error(`[ERROR] DATABASE CONNECTION: ${e}`);
		return;
	}

	if (conn)
		conn.release();

	console.log(`[SUCCESS] CONNECTED TO DATABASE`);
});

module.exports = pool.promise();