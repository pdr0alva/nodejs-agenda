const formatDateString = (datestr) => 
{
    return datestr !== null ? datestr.replaceAll('-', '/') : null;
}

const formatTimeString = (timestr) =>
{
    return null;
}

export { formatDateString, formatTimeString };