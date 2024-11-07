"use strict"

const { ClientModel, ClientsRepository } = require('../models/clientsModel.js');

class ClientsController 
{
	constructor () {}

	async getAllClients (req, res)
	{
		try 
		{
			const repository = new ClientsRepository();

			const clients = await repository.selectAllClients();
			res.status(200).json(clients);
		}
		catch (e)
		{
			res.status(500).json({ message: e.message });
		}
	}	

	async searchController (req, res)
	{
		const { id, session_id } =  req.query;
		
		if (id === undefined && session_id === undefined)
		{
			res.status(400).json({ message: "Neither ID or SessionID is requested" });
			return;
		}

		try
		{
			const repository = new ClientsRepository();

			let result;
	
			if (id && !isNaN(id))
			{
				result = await repository.selectClientById(id);
			}
			else if (session_id && !isNaN(session_id))
			{
				result = await repository.selectClientBySessionId(session_id);
			}
		
			res.status(200).json(result);	
		}
		catch (e)
		{
			res.status(500).json({ message: 'Internal server error', e });
		};
	}
}

module.exports = { ClientsController };