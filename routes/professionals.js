"use strict";

const { Router } = require('express');
const professionalsController = require('../controllers/professionals.js');

const professionalsRoute = Router();

professionalsRoute.get('/', professionalsController.getAllProfessionals);
professionalsRoute.get('/search', professionalsController.searchController);

module.exports = professionalsRoute;