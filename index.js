"use strict";

const express = require('express');
const path    = require('path');
const cors    = require('cors');

const APP = express();
const PORT = 3000;

APP.use(express.json());
APP.use(cors());

/* routes */
const SessionsRoute = require('./routes/sessions.js');
const ClientsRoute = require('./routes/clients.js');
const ProfessionalsRoute = require('./routes/professionals.js');
const UsersRoute = require('./routes/usersRoute.js')

APP.use("/data/sessions", SessionsRoute);
APP.use("/data/clients", ClientsRoute);
APP.use("/data/professionals", ProfessionalsRoute);
APP.use("/data/users", UsersRoute);

APP.use(express.static(path.join(__dirname, 'public')));

APP.get('/', (req, res) =>
{
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
})


APP.listen(PORT, () => 
{ 
    console.log(`[LISTENING ON localhost: ${PORT}]`) 
});