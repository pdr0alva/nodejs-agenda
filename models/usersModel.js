"use strict"

const db = require('./db-conn.js')
const bcrypt = require('bcrypt');

class UsersModel
{
    constructor (username, password, email) 
    {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    async hashPassword()
    {
        const salt_rounds = 10;
        return await bcrypt.hash(this.password, salt_rounds);
    }
}

class UsersRepository
{   
    constructor () {}

    async validateUser (username, email)
    {
        const SQL = `
            SELECT 
                CASE
                    WHEN EXISTS(SELECT 0 FROM Users WHERE username = ?) THEN 'username'
                    WHEN EXISTS(SELECT 0 FROM Users WHERE email = ?) THEN 'email'
                    ELSE 'success'
                END AS conflict;
        `;

        try
        {
            const [ result ] = await db.execute(SQL, [ username, email ]);
            return result[0].conflict;
        }
        catch (e)
        {
            console.log(`error on validateUser: ${e}`);
        };
    }

    async insertUser (User)
    {
        const SQL = `INSERT INTO Users(username, password_hash, email) VALUES(?, ?, ?)`;

        try 
        {
            console.log(`\n\n${User.username}, ${await User.hashPassword()}, ${User.email}\n\n`);

            db.execute(SQL, [ User.username, await User.hashPassword(), User.email ]);
            return "success";
        }
        catch (e)
        {
            console.log(`[MYSQL.ERROR: ${e}]`);
            throw e;
        };
    }   
}

module.exports = { UsersModel, UsersRepository };