"use strict"

const db = require('./db-conn.js');

class ProfessionalModel
{
    constructor(name_, phone, cpf, address, birthday) 
    {
        this.name_ = name_;
        this.phone = phone;
        this.cpf = cpf;
        this.address = address;
        this.birthday = birthday;
    }
}

class ProfessionalsRepository
{
    async selectAllProfessionals()
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
            throw new Error("Could not retrieve information from database");
        }
    }
    
    async selectProfessionalById(id)
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
            throw new Error("Could not retrieve information from database");
        };  
    }
    
    async selectProfessionalBySessionId(id)
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
            throw new Error("Could not retrieve information from database");
        };
    }
}

module.exports = { ProfessionalModel, ProfessionalsRepository };