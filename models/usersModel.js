const db = require('./db-conn.js')
const bcrypt = require('bcrypt');

class UsersModel
{
    construtor () {}

    async #UsernameExists(username)
    {
        const sql = `
            SELECT EXISTS(
                SELECT NULL
                FROM Users
                WHERE username = ?
            ) AS exist;
        `; 

        try 
        {
            const [ result ] = await db.execute(sql, [ username ]);
            return result[0].exist ? true : false;
        }
        catch (e)
        {
            console.log(`ERROR ON #UsernameExists ${e}`);
            throw e;
        }
    }

    async #EmailExists(email)
    {
            const sql = `
            SELECT EXISTS(
                SELECT NULL
                FROM Users
                WHERE email = ?
            ) AS exist;
        `; 

        try 
        {
            const [ result ] = await db.execute(sql, [ email ]);
            return result[0].exist ? true : false;
        }
        catch (e)
        {
            console.log(`ERROR ON #EmailExists: ${e}`);
            throw e;
        }
    }

    async #hash_password(password)
    {
        const salt_rounds = 10;
        const hashed = await bcrypt.hash(password, salt_rounds);
        return hashed;        
    }

    async register( user_obj )
    {
        const sql = `
            INSERT INTO Users(username, password_hash, email) VALUES(?, ?, ?);
        `

        if(await this.#UsernameExists(user_obj.username))
        {
            throw new Error("User already exists");
        }

        if(await this.#EmailExists(user_obj.email))
        {
            throw new Error("Email already registered");
        }

        const hashed_password = await this.#hash_password(user_obj.password);

        console.log(hashed_password);

        try 
        {
            const [ result ] = await db.execute(sql, [ user_obj.username, hashed_password, user_obj.email ]);
            
            console.log(result);
            
            return "success";
        }
        catch (e)
        {
            console.log(`[MYSQL.ERROR ${e}]`);    
        };
    } 
}

module.exports = { UsersModel };