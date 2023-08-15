//models/Events.js

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Event extends Model { }
    Event.init({
        eventsId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dislikes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateCreation: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateEvents: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: "Event"
        });

    return Event;
};
