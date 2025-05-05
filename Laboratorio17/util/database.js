const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host:"localhost",
    user:"ERNIE",
    password:"tc2005b",
    connectionLimit:5,
    database: "test",
    port: 3306
});

module.exports = pool;