const models = require("../models");
const Actualite = models.actualites;
const User = models.users;

// Toutes les actualités
exports.findAllActualites = (req, res, next) => {
  Actualite.findAll({
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "isActive"]
    },
    order: [["id", "DESC"]]
  })
    .then(actualites => {
      const listeActualites = actualites.map(actualite => {
        return {
          id: actualite.id,
          createdAt: actualite.createdAt,
          title: actualite.title,
          subTitle: actualite.subTitle,
          description: actualite.description,
          imageUrl: actualite.imageUrl,
          likes: actualite.likes,
          dislikes: actualite.dislikes,
          userId: actualite.UserId,
          userName: actualite.User.userName,
          avatar: actualite.User.avatar,
          isActive: actualite.User.isActive
        };
      });
      res.status(200).json({ listeActualites });
    })
    .catch(error => res.status(400).json({ error }));
}

// Toutes les actualités d'un utilisateur
exports.findAllActualitesForOne = (req, res, next) => {
  Actualite.findAll({
    where: { UserId: req.params.id },
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "isActive"]
    },
    order: [["id", "DESC"]]
  })
    .then(actualites => {
      const listeActualites = actualites.map(actualite => {
        return {
          id: actualite.id,
          createdAt: actualite.createdAt,
          title: actualite.title,
          subTitle: actualite.subTitle,
          description: actualite.description,
          imageUrl: actualite.imageUrl,
          likes: actualite.likes,
          dislikes: actualite.dislikes,
          userId: actualite.UserId,
          userName: actualite.User.userName,
          avatar: actualite.User.avatar,
          isActive: actualite.User.isActive
        };
      });
      res.status(200).json({ listeActualites });
    })
    .catch(error => res.status(400).json({ error }));
}

// Une seule actualité
exports.findOneActualite = (req, res, next) => {
  const oneActualite = {};
  Actualite.findOne({
    where: { id: req.params.id },
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "isActive"]
    }
  })
    .then(actualite => {
      oneActualite.id = actualite.id;
      oneActualite.userId = actualite.UserId;
      oneActualite.avatar = actualite.User.avatar;
      oneActualite.userName = actualite.User.userName;
      oneActualite.isActive = actualite.User.isActive;
      oneActualite.createdAt = actualite.createdAt;
      oneActualite.title = actualite.title;
      oneActualite.subTitle = actualite.subTitle;
      oneActualite.description = actualite.description;
      oneActualite.imageUrl = actualite.imageUrl;
      oneActualite.likes = actualite.likes;
      oneActualite.dislikes = actualite.dislikes;
    })
    .catch(error => res.status(404).json({ error }));
};

// Créer une actualité
exports.createActualite = (req, res, next) => {
  const actualite = {
    UserId: req.body.userId,
    title: req.body.title,
    subTitle: req.body.subTitle,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    likes: req.body.likes,
    dislikes: req.body.dislikes
  };

  Actualite.create(actualite)
    .then(() => res.status(201).json({ message: "Actualité créée avec succès !" }))
    .catch(error => res.status(400).json({ error }));
};

// Modifier une actualité
exports.modifyActualite = (req, res, next) => {
  const actualiteObject = req.file ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };

  Actualite.update(actualiteObject, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Actualité modifiée avec succès !" }))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer une actualité
exports.deleteActualite = (req, res, next) => {
  Actualite.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Actualité supprimée avec succès !" }))
    .catch(error => res.status(400).json({ error }));
};
