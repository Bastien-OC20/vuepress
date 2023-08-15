const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    User.findOne({ where: { isAdmin: true } })
        .then(admin => {
            if (!admin) {
                return res.status(403).json({ error: "L'administrateur doit être créé en premier !" });
            }

            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash,
                        isAdmin: false,
                        isActive: true
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                        .catch(error => res.status(401).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(502).json({ error }));
}

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user.isActive === false) {
                return res.status(403).json({ error: "Utilisateur supprimé !" });
            }
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé !" });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        message: "Utilisateur connecté !",
                        userId: user.id,
                        role: user.isAdmin,
                        userName: user.userName,
                        avatar: user.avatar,
                        token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(501).json({ error }));
        })
        .catch(error => res.status(502).json({ error }));
}
// Gérer les utilisateurs ayant le rôle de "rédacteur"
exports.manageRedactorUsers = (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé !" });
            }
            if (!user.isAdmin) {
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à gérer cet utilisateur !" });
            }

            // Ajouter un nouvel utilisateur avec le rôle de "rédacteur"
            if (req.body.newRedactor) {
                const newRedactor = new User({
                    userName: req.body.newRedactor.userName,
                    email: req.body.newRedactor.email,
                    password: req.body.newRedactor.password,
                    isAdmin: false,
                    isActive: true
                });
                newRedactor.save()
                    .then(() => res.status(201).json({ message: "Nouveau rédacteur ajouté avec succès !" }))
                    .catch(error => res.status(401).json({ error }));
            }

            // Modifier les informations d'un utilisateur "rédacteur"
            if (req.body.modifyRedactor) {
                const redactorId = req.body.modifyRedactor.redactorId;
                User.findByPk(redactorId)
                    .then(redactor => {
                        if (!redactor) {
                            return res.status(404).json({ error: "Rédacteur non trouvé !" });
                        }
                        redactor.userName = req.body.modifyRedactor.userName;
                        redactor.email = req.body.modifyRedactor.email;
                        redactor.isActive = req.body.modifyRedactor.isActive;
                        redactor.save()
                            .then(() => res.status(200).json({ message: "Informations du rédacteur modifiées avec succès !" }))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }

            // Supprimer un utilisateur "rédacteur"
            if (req.body.deleteRedactorId) {
                const redactorId = req.body.deleteRedactorId;
                User.findByPk(redactorId)
                    .then(redactor => {
                        if (!redactor) {
                            return res.status(404).json({ error: "Rédacteur non trouvé !" });
                        }
                        redactor.destroy()
                            .then(() => res.status(200).json({ message: "Rédacteur supprimé avec succès !" }))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }
            // Afficher les statistiques des rédacteurs
            if (req.body.showRedactorsStats) {
                User.findAll({ where: { isAdmin: false } })
                    .then(redactors => {
                        const redactorsStats = redactors.map(redactor => {
                            return {
                                userId: redactor.id,
                                userName: redactor.userName,
                                articlesCount:articleCount,
                                isActive: redactor.isActive
                            };
                        });
                        res.status(200).json({ redactorsStats });
                    })
                    .catch(error => res.status(500).json({ error }));
            }

            // Activer/Désactiver un utilisateur "rédacteur"
            if (req.body.toggleRedactorStatus) {
                const redactorId = req.body.toggleRedactorStatus.redactorId;
                const newStatus = req.body.toggleRedactorStatus.isActive;
                User.findByPk(redactorId)
                    .then(redactor => {
                        if (!redactor) {
                            return res.status(404).json({ error: "Rédacteur non trouvé !" });
                        }
                        redactor.isActive = newStatus;
                        redactor.save()
                            .then(() => {
                                const statusText = newStatus ? "activé" : "désactivé";
                                res.status(200).json({ message: `Rédacteur ${statusText} avec succès !` });
                            })
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }

            // Ajouter d'autres fonctionnalités spécifiques de l'administrateur ici
            // ...

            res.status(200).json({ message: "Opérations sur les utilisateurs 'rédacteurs' effectuées avec succès !" });
        })
        .catch(error => res.status(500).json({ error }));
}
