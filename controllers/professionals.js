"use strict"

const professionalsModel = require('../models/professionals.js');

const getAllProfessionals = async (req, res) =>
{
    try 
    {
        const professionals = await professionalsModel.selectAllProfessionals();
        res.status(200).json(professionals);
    }
    catch (e)
    {
        res.status(500).json({ message: e.message });
    }
}

const searchController = async (req, res) =>
{
    const { id, session_id } = req.query;

    
    try 
    {
        let result;

        if (id && !isNaN(id))
        {
            result = await professionalsModel.selectProfessionalById(id);
        }
        else if (session_id && !isNaN(session_id))
        {
            result = await professionalsModel.selectProfessionalBySessionId(session_id);
        }

        res.status(200).json(result);
    }
    catch (e)
    {
        res.status(500).json({ message: `Internal server error ${e}`});
    }
}

module.exports = { getAllProfessionals, searchController }