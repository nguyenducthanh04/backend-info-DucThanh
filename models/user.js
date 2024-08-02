"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.comment, {
                foreignKey: "userId",
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            avatar: DataTypes.STRING,
            idProfile: DataTypes.STRING,
            providerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
