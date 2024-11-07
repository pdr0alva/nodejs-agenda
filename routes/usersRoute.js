"use strict"

const { Router } = require('express');
const { UsersController } = require('../controllers/usersController.js');

const usersController = new UsersController;

const usersRoute = Router();

usersRoute.post('/', usersController.register);


module.exports = usersRoute;