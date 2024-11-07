"use strict";

const { Router } = require('express');
const { SessionsController } = require('../controllers/sessionsController.js');

const sessionsRoute = Router();
const sessionsController = new SessionsController();

sessionsRoute.get('/', sessionsController.getAllSessions);

module.exports = sessionsRoute;
