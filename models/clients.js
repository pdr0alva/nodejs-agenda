"use strict";

const fs = require('fs').promises;
const db = require('./db-conn.js');

const selectAllClients = async () =>
{
	const sql = 'SELECT * FROM Clients';

	try 
	{	
		const [ rows ] = await db.query(sql);
		return rows;
	}
	catch (e)
	{
		console.error(`[MYSQL.ERROR] ${e.message}`);
	};
};

const selectClientById = async (id) => 
{
	const sql = 'SELECT * FROM Clients WHERE id = ?';

	try 
	{
		const [ results ] = await db.execute(sql, [id]);
		
		return results[0] || null;
	}
	catch(e)
	{
		console.error(`[MYSQL.ERROR: ${e}]`);
	};
};

const selectClientBySessionId = async (session_id) =>
{
	const sql = `
		SELECT 
			Clients.id,
			Clients._name AS name,
			Clients.phone,
			Clients.indicated_by AS indicatedBy,
			Clients.birthday,
			Clients.cpf,
			Clients.address
		FROM Sessions
		INNER JOIN Clients ON Sessions.client_id = Clients.id
		WHERE Sessions.id = ?  
	`;

	try 
	{
		const [ results ] = await db.execute(sql, [session_id]);
		return results[0] || null;
	}
	catch (e)
	{
		console.log(`[MYSQL.ERROR: ${e}]`);
	};
}

module.exports = { 
	selectAllClients, 
	selectClientById,
	selectClientBySessionId
}; 