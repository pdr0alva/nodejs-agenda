"use strict"

const { SessionsModel, SessionsRepository } = require('../models/sessionsModel.js');


class SessionsController 
{
	constructor () {}

	async getAllSessions(req, res)
	{
		try 
		{	
			const repository = new SessionsRepository;
			const sessions = await repository.selectAllSessions();
			
			res.status(200).json(sessions);
		}
		catch (e)
		{
			res.status(500).json({ message: e.message });
		}
	}
}

module.exports = { SessionsController };
