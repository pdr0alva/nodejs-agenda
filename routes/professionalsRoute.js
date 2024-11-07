"use strict";

const { Router } = require('express');
const { ProfessionalsController } = require('../controllers/professionalsController.js');

const professionalsRoute = Router();
const professionalsController = new ProfessionalsController();

professionalsRoute.get('/', professionalsController.getAllProfessionals);
professionalsRoute.get('/search', professionalsController.searchController);

module.exports = professionalsRoute;