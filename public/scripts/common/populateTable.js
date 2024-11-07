const populateTable = (tableElement, datakeys, dataJSON) =>
{
    dataJSON.forEach(elem =>
    {
        const row = tableElement.insertRow();

        datakeys.forEach((key, i) =>
        {
            const cell = row.insertCell(i);

            if (elem[key] !== undefined && elem[key] !== null && elem[key] !== ``)
            {
                cell.textContent = elem[key];
            }
            else
            {
                cell.textContent = 'N/d';
                cell.style = 'color: grey; font-style: italic';
            }
        });
    });
}

export { populateTable };