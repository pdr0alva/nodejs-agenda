"use strict";

const { Router } = require('express');
const sessionsController = require('../controllers/sessions.js');

const sessionsRoute = Router();

sessionsRoute.get('/', sessionsController.getAllSessions);

module.exports = sessionsRoute;
