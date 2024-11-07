"use strict"

const clientsModel = require('../models/clients.js');

async function getAllClients(req, res)
{
	try 
	{
		const clients = await clientsModel.selectAllClients();
		res.status(200).json(clients);
	}
	catch (e)
	{
		res.status(500).json({ message: e.message });
	}
}	

const searchController = async (req, res) =>
{
	const { id, session_id } =  req.query;
	
	try
	{
		let result;

		if (id && !isNaN(id))
		{
			result = await clientsModel.selectClientById(id);
		}
		else if (session_id && !isNaN(session_id))
		{
			result = await clientsModel.selectClientBySessionId(session_id);
		}
	
		res.status(200).json(result);	
	}
	catch (e)
	{
		res.status(500).json({ message: 'Internal server error', e });
	};
}
module.exports = { getAllClients, searchController };