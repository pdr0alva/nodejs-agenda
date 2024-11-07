"use strict"

const db = require('./db-conn.js');

const selectAllProfessionals = async () =>
{
    const sql = 'SELECT * FROM Professionals';

    try
    {
        const [ rows ] = await db.query(sql);
        return rows;
    }
    catch (e)
    {
        console.error(`[ERROR.MYSQL] ${ e.message }`);
    }
}

const selectProfessionalById = async (id) =>
{
    const sql = 'SELECT * FROM Professionals WHERE id = ?'; 

    try 
    {
        const [ results ] = await db.execute(sql, [id]);
        return results || null;
    }
    catch (e)
    {
        console.log(`[MYSQL.ERROR ${e}]`);
    };  
}

const selectProfessionalBySessionId = async (id) =>
{
    const sql = `
        SELECT 
            Professionals.id,
            Professionals._name AS name,
            Professionals.phone,
            Professionals.birthday,
            Professionals.cpf,
            Professionals.address
        FROM Sessions
        INNER JOIN Professionals ON Sessions.professional_id = Professionals.id
        WHERE Sessions.id = ?  
    `;

    try 
    {
        const [ results ] = await db.execute(sql, [id]);
    
        return results || null;
    }
    catch (e)
    {
        console.log(`[MYSQL.ERROR: ${e}]`);
    };
}


module.exports = { 
    selectAllProfessionals, 
    selectProfessionalById,
    selectProfessionalBySessionId
};