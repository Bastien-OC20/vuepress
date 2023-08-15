const db = require("../models");
const User = db.users;
const Actualites = db.actualites;
const Events = db.Events;

// Créer un utilisateur avec un rôle de rédacteur
exports.createUser = (req, res, next) => {
    const user = {
        userName: req.body.userName,
        email: req.body.email,
        // Autres champs de l'utilisateur
        isAdmin: req.body.isRedactor || false, // Par défaut, l'utilisateur est un admin
        role: req.body.isAdmin ? "Administrateur" : "Redactor" // Ajuster le rôle en conséquence
    };

    User.create(user)
        .then(() => res.status(201).json({ message: "Utilisateur créé avec succès !" }))
        .catch(error => res.status(400).json({ error }));
};

// Trouver un utilisateur
exports.findOneUser = (req, res, next) => {
    const userInfo = {};
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            userInfo.userName = user.userName;
            userInfo.email = user.email;
            userInfo.role = user.isAdmin ? "Administrateur" : "Redactor";
            userInfo.createdAt = user.createdAt;
            userInfo.avatar = user.avatar;
        })
        .then(() => {
            Actualite.count({ where: { userId: req.params.id } })
                .then(actucount => { userInfo.actualitesCount = actucount; })
        })
        .then(() => {
            Event.count({ where: { userId: req.params.id } })
                .then(eventcount => {
                    userInfo.eventsCount = eventcount;
                    res.status(200).json(userInfo);
                })
        })
        .catch(error => res.status(404).json({ error }));
};

// Modifier un utilisateur
exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body,
            avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body };
    User.update(userObject, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Utilisateur modifié avec succès !" }))
        .catch(error => res.status(400).json({ error }));
};
