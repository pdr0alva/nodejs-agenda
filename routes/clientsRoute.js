"use strict";

const { Router } = require('express');
const { ClientsController } = require('../controllers/clientsController.js');

const clientsRoute = Router();
const clientsController = new ClientsController();

clientsRoute.get('/', clientsController.getAllClients);
clientsRoute.get('/search', clientsController.searchController);

module.exports = clientsRoute;