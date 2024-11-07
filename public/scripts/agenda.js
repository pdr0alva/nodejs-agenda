"use strict";

import { fetchData } from './common/fetch_api.js';
import { populateTable } from './common/populateTable.js'
import { formatDateString } from './common/formatDatetimeString.js';

document.addEventListener('DOMContentLoaded', async (e) => 
{
    agendaInsert(await fetchData('http://192.168.5.160/data/sessions/'));
})

const agendaInsert = (agendaJSON) =>
{
    const table_agenda = document.getElementById('agenda');

    const agenda_keys = [
        "sessionDate", 
        "sessionHour", 
        "clientName", 
        "professionalName",
        "sessionName",
        "price",
        "sessionNote"
    ];

    agendaJSON.forEach(elem => 
    {   
        elem['sessionDate'] = formatDateString(elem['sessionDate']);
    });   

    populateTable(table_agenda, agenda_keys, agendaJSON);
}