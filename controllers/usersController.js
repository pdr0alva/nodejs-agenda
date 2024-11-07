"use strict"

const { UsersModel } = require('../models/usersModel')
const usersModel = new UsersModel();


class UsersController 
{
    constructor()
    {
        this.usersModel = new UsersModel;
    }

    async register (req, res)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^\w+$/;

        const { username, password, email } = req.body;

        if ( !username || !password || !email )
            return res.status(400).json({ error: 'All fields must be filled'});

        if (username.length <3 || username.lenght >= 30)
            return res.status(400).json({ error: 'Error: Name must be between 3 and 30 characters' }); 

        if (!usernameRegex.test(username))
            return res.status(400).json({ error: 'Error: Name must have only alphanumerics characters' });

        if (!emailRegex.test(email))
            return res.status(400).json({ error: "Error: invalid email"});

        try 
        {
            if (await usersModel.register({ username, password, email }) === "success")
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