// models/User.js

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class User extends Model { }
    User.init({
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ".../images/avatars/default_user.jpg"
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isRedactor: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
        {
            sequelize,
            modelName: "user"
        })
    return User
}