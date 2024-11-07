const fetchData = async (url) =>
{
    try
    {
        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`[SERVER ERROR: ${response.status}]`)
     
        return await response.json();
    }
    catch (e)
    {
        window.alert("ERRO NO SERVIDOR | REPORTE PARA pedro.alvarenga.afonso@gmail.com");
    }
}
 
export { fetchData };