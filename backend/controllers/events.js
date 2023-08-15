const models = require("../models");
const Event = models.events;
const User = models.users;

// Tous les événements
exports.findAllEvents = (req, res, next) => {
  Event.findAll({
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "isActive"]
    },
    order: [["id", "DESC"]]
  })
    .then(events => {
      const listeEvents = events.map(event => {
        return {
          id: event.id,
          createdAt: event.createdAt,
          eventsId: event.eventsId,
          title: event.title,
          subTitle: event.subTitle,
          description: event.description,
          imageUrl: event.imageUrl,
          likes: event.likes,
          dislikes: event.dislikes,
          dateCreation: event.dateCreation,
          dateEvents: event.dateEvents,
          userId: event.UserId,
          userName: event.User.userName,
          avatar: event.User.avatar,
          isActive: event.User.isActive
        };
      });
      res.status(200).json({ listeEvents });
    })
    .catch(error => res.status(400).json({ error }));
}

// Tous les événements d'un utilisateur
exports.findAllEventsForOne = (req, res, next) => {
  Event.findAll({
    where: { UserId: req.params.id },
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "isActive"]
    },
    order: [["id", "DESC"]]
  })
    .then(events => {
      const listeEvents = events.map(event => {
        return {
          id: event.id,
          createdAt: event.createdAt,
          eventsId: event.eventsId,
          title: event.title,
          subTitle: event.subTitle,
          description: event.description,
          imageUrl: event.imageUrl,
          likes: event.likes,
          dislikes: event.dislikes,
          dateCreation: event.dateCreation,
          dateEvents: event.dateEvents,
          userId: event.UserId,
          userName: event.User.userName,
          avatar: event.User.avatar,
          isActive: event.User.isActive
        };
      });
      res.status(200).json({ listeEvents });
    })
    .catch(error => res.status(400).json({ error }));
}

// Un seul événement
exports.findOneEvent = (req, res, next) => {
  const oneEvent = {};
  Event.findOne({
    where: { id: req.params.id },
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "isActive"]
    }
  })
    .then(event => {
      oneEvent.id = event.id;
      oneEvent.userId = event.UserId;
      oneEvent.avatar = event.User.avatar;
      oneEvent.userName = event.User.userName;
      oneEvent.isActive = event.User.isActive;
      oneEvent.createdAt = event.createdAt;
      oneEvent.eventsId = event.eventsId;
      oneEvent.title = event.title;
      oneEvent.subTitle = event.subTitle;
      oneEvent.description = event.description;
      oneEvent.imageUrl = event.imageUrl;
      oneEvent.likes = event.likes;
      oneEvent.dislikes = event.dislikes;
      oneEvent.dateCreation = event.dateCreation;
      oneEvent.dateEvents = event.dateEvents;
    })
    .catch(error => res.status(404).json({ error }));
};

// Créer un événement
exports.createEvent = (req, res, next) => {
  const event = {
    UserId: req.body.userId,
    eventsId: req.body.eventsId,
    title: req.body.title,
    subTitle: req.body.subTitle,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    dateCreation: req.body.dateCreation,
    dateEvents: req.body.dateEvents
  };

  Event.create(event)
    .then(() => res.status(201).json({ message: "Événement créé avec succès !" }))
    .catch(error => res.status(400).json({ error }));
};

// Modifier un événement
exports.modifyEvent = (req, res, next) => {
  const eventObject = req.file ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };

  Event.update(eventObject, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Événement modifié avec succès !" }))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer un événement
exports.deleteEvent = (req, res, next) => {
  Event.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Événement supprimé avec succès !" }))
    .catch(error => res.status(400).json({ error }));
};
