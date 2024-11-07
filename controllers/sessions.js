"use strict"

const sessionsModel = require('../models/sessions.js');

async function getAllSessions(req, res)
{
	try 
	{	
		const sessions = await sessionsModel.selectAllSessions();
		res.status(200).json(sessions);
	}
	catch (e)
	{
		res.status(500).json({ message: e.message });
	}
}

module.exports = { getAllSessions };
