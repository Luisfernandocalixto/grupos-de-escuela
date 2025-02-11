const {
    HOSTING,
    USER,
    PASSWORD,
    DATABASE

} = require('../../config/config.js');

module.exports = {
    database: {
        host: HOSTING,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
    }
}