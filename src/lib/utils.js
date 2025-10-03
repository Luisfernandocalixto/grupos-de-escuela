function showDate({ date }) {
    const isDate = new Date(date);
    const returningDate = date.split("/").reverse();
    const isDay = isDate.toLocaleDateString('es-Mx', { weekday: "short" });
    const isDayNumber = returningDate[0].toString();
    const isMonth = isDate.toLocaleDateString('es-Mx', { month: "short" });
    const getYear = returningDate[2].toString();
    return `${isDay}-${isDayNumber}-${isMonth}-${getYear}`;

}

module.exports = {
    showDate
};
