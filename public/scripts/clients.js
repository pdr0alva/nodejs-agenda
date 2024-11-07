"use strict"

import { fetchData } from "./common/fetch_api.js";
import { formatDateString } from "./common/formatDatetimeString.js";

document.addEventListener("DOMContentLoaded", async () => 
{
    setClientsTable(await fetchData('http://192.168.5.160/data/clients/'));
});

const setClientsTable = (clientsJSON) =>
{
    const clients_table = document.getElementById('clients-table');

    const clients_keys = [
        "_name",
        "phone",
        "CPF",
        "address",
        "indicated_by",
        "birthday"
    ];

    clientsJSON.forEach((elem) => 
    {
        const row = clients_table.insertRow();

        clients_keys.forEach((key, i) =>
        {
            const cell = row.insertCell(i);
            
            if (elem[key] !== undefined && elem[key] !== `` && elem[key] !== null)
            {
                cell.textContent = key !== 'birthday' ? elem[key] : formatDateString(elem[key]); 
            }   
            else
            {
                cell.textContent = 'N/A';
                cell.style = 'color: grey; font-style: italic';
            }
        });
    });
}