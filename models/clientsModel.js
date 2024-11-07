"use strict";

const fs = require('fs').promises;
const db = require('./db-conn.js');

class ClientModel
{
	constructor (name_, phone, indicated_by, birthday, cpf, address)
	{
		this.name = name_;
		this.phone = phone;
		this.indicated_by = indicated_by;
		this.birthday = birthday;
		this.cpf = cpf;
		this.address = address;
	}
}


class ClientsRepository
{
	construct(){}
	
	async selectAllClients () 
	{
		const sql = 'SELECT * FROM Clients';
			
		try 
		{	
			const [ results ] = await db.query(sql);
			return results;
		}
		catch (e)
		{
			console.error(`[MYSQL.ERROR] ${e.message}`);
			throw new Error("[SERVER_ERROR]");
		};
	}

	async selectClientById (id)
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
	}

	async selectClientBySessionId (session_id) 
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
}


module.exports = { ClientModel, ClientsRepository }; 