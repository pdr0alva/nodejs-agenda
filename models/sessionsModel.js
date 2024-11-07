"use strict";

const db = require('./db-conn.js');

const fs = require('fs').promises;
const path = require('path');

class SessionModel
{
	constructor(professionalID, clientID, price, session_date, payment_method, session_note, session_type)
	{
		this.professionalID = professionalID;
		this.clientID = clientID;
		this.price = price;
		this.session_date = session_date;
		this.payment_method = payment_method;
		this.session_note = session_note;
		this.session_type = session_type;
	}
}

class SessionsRepository
{
	async selectAllSessions()
	{
		const sqlpath = path.resolve('./models/sql/sessions/', 'select-agenda.sql');
		const sql = await fs.readFile(sqlpath, 'utf-8');
		
		try 
		{
			const [ rows ] = await db.query(sql);
	
			rows.forEach(elem => 
			{
				const dateObj = elem["sessionDate"];
	
				elem["sessionDate"] = dateObj.toISOString().split("T")[0];
				elem["sessionHour"] = dateObj.toLocaleTimeString('pt-BR', { hour12: false, minute: '2-digit', hour: '2-digit' });
			});
	
			return rows;
		}
		catch (e)
		{
			console.error(`[ERROR.MYSQL] ${e.message}`);
			throw new Error("Could not retrieve database information");
		}
	}
}



module.exports = { SessionModel, SessionsRepository };