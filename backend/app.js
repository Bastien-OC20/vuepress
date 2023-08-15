// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // transformation du corps des requetes en objet JS utilisable
const path = require('path'); // Access au chemin des fichiers
const auth = require("./middleware/auth")
// recuperation de Helmet (sécurise les appli Express en définissant divers en-têtes HTTPP, protège contre les failles XSS//
const helmet = require('helmet');
const cors = require('cors');


//environnement variables//
require('dotenv').config()

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const actualitesRoutes = require("./routes/actualites")
const eventsRoutes = require("./routes/events")

//DB connection//
require("./Database/dbConnexion");



/* CROSS ORIGIN RESOURCE SHARING CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes)
app.use('/api/actualites', actualitesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;