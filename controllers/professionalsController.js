"use strict"

const { ProfessionalModel, ProfessionalsRepository } = require('../models/professionalsModel.js');

class ProfessionalsController
{
    constructor () {}

    async getAllProfessionals(req, res)
    {
        const repository = new ProfessionalsRepository();

        try 
        {
            const professionals = await repository.selectAllProfessionals();
            res.status(200).json(professionals);
        }
        catch (e)
        {
            res.status(500).json({ message: e.message });
        }
    }
    
    async searchController(req, res)
    {
        const { id, session_id } = req.query;
        const repository = new ProfessionalsRepository();

        try 
        {
            let result;
    
            if (id && !isNaN(id))
            {
                result = await repository.selectProfessionalById(id);
            }
            else if (session_id && !isNaN(session_id))
            {
                result = await repository.selectProfessionalBySessionId(session_id);
            }
    
            res.status(200).json(result);
        }
        catch (e)
        {
            res.status(500).json({ message: `Internal server error ${e}`});
        }
    }
}

module.exports = { ProfessionalsController }