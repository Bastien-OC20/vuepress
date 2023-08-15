const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_DATANAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
});

sequelize
    .authenticate()
    .then(() => {
        console.log('La connnexion s\'est établie correctement');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

module.exports = sequelize
global.sequelize = sequelize;