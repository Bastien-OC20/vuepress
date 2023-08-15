const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.oregon-postgres.render.com/${process.env.DB_DATANAME}`, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Vous devrez peut-être ajuster cela en fonction de vos besoins de sécurité
        }
    }
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