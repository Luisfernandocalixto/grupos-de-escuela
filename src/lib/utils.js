function showDate({ date }) {
    return new Date(date).toLocaleString('es-MX', { day: '2-digit', weekday: 'short', month: 'short', year: 'numeric' })
}

module.exports = {
    showDate
};
