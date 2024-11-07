import { fetchData } from "./common/fetch_api.js";
import { formatDateString } from "./common/formatDatetimeString.js";
import { populateTable } from "./common/populateTable.js";

document.addEventListener("DOMContentLoaded", async () =>
{
    setProfessionalsTable(await fetchData('http://192.168.5.160/data/professionals/'));
});

const setProfessionalsTable = (professionalsJSON) =>
{
    const professionals_table = document.getElementById("professionals-table");
    const professionals_keys = [
        "_name",
        "phone",
        "address",
        "cpf",
        "birthday"
    ];

    professionalsJSON.forEach((elem) => 
    {
        elem['birthday'] = formatDateString(elem['birthday']);
    });

    populateTable(professionals_table, professionals_keys, professionalsJSON);
}