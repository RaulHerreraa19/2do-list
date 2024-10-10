// config/dbConfig.js
require('dotenv').config();
const sql = require('mssql');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true
    },
    port: parseInt(process.env.DB_PORT, 10),
};

sql.connect(config).then(pool => {
    return pool.request().query('SELECT 1 AS result');
    }).then(result => {
    console.log('Conexión exitosa:', result);
    }).catch(err => {
    console.error('Error conectándose a la base de datos:', err);
    });

module.exports = config;
