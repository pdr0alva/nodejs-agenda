"use strict"

const { UsersModel, UsersRepository } = require('../models/usersModel.js')

class UsersController 
{
    constructor() { }

    async register (req, res)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^\w+$/;

        const { username, password, email } = req.body;

        if ( !username || !password || !email )
            return res.status(400).json({ error: 'All fields must be filled'});

        if (username.length <3 || username.length >= 30)
            return res.status(400).json({ error: 'Error: Name must be between 3 and 30 characters' }); 

        if (!usernameRegex.test(username))
            return res.status(400).json({ error: 'Error: Name must have only alphanumerics characters' });

        if (!emailRegex.test(email))
            return res.status(400).json({ error: "Error: invalid email"});
        
        
        try 
        {
            const user = new UsersModel(username, password, email);
            const repository = new UsersRepository(); 

            const validate = await repository.validateUser(user.username, user.email);
        
            switch (validate)
            {
                case 'username':
                    throw new Error('Username Already Exists');

                case 'email':
                    throw new Error('Email Already Exists');
            }
            
            if (await repository.insertUser(user) === "success")
            {
                res.status(201).json({ message: "Successfully Registered" });
            }
            else
            {
                res.status(500).json({ message: "something unexpected happened" });
            }
        }
        catch (e)
        {
            res.status(400).json({ message: e.message }); 
        };
    }
}

module.exports = { UsersController };