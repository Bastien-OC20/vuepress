# Réseau social d'entreprise Groupomania

## Groupomania API

Cette api qui permet de:

- se connecter en tant d'administrateur
- créer / modifier / supprimer une actualités avec média
- créer / modifier / supprimer un événement


## Comment utiliser cette API?

clonner cet repository :

      git clone 

## Pour lancer le serveur Nodejs

Executez ces lignes dans le terminal :

      cd backend/
      npm install
      node server

## Pour lancer le projet back-end

Dans un second terminal, executez ces lignes :

      cd Back-end/
      npm install
      npm run server

## Technique utilise

Cette api est développé sur NODEJS en utilisant ExpressJS.
la Base de donnée : MySql

## les routes/url et endpoints de l'API


### - POST : /api/auth/login {email, password, username}

        : Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé (contenant également l'identifiant userID)
        > message: 'Utilisateur(rice) connecté(e) !'

### - GET : /api/actualites

        : Renvoie le tableau de toutes les actualités dans la base de données
        > tableau des actualités

### - GET : /api/events

        : Renvoie le tableau de tout les événements dans la base de données
        > tableau des événements

### - GET : /api/users/:id

        : renvoie au profil avec l'ID fourni
        > profil unique

### - PUT : /api/users/:id

        : Modifie le profil de l'utilisateur'

### - DELETE : /api/users/:id

        : supprimer la profil avec l'ID fourni
        > message: 'compte supprimé !'



#### project backend

