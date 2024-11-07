"use strict";

const { Router } = require('express');
const clientsController = require('../controllers/clients.js');

const clientsRoute = Router();

clientsRoute.get('/', clientsController.getAllClients);

clientsRoute.get('/search', clientsController.searchController);


module.exports = clientsRoute;