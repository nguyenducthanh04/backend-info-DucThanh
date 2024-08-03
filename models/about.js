"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class about extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    about.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            aboutHTML: DataTypes.TEXT("long"),
            aboutMarkDown: DataTypes.TEXT("long"),
        },
        {
            sequelize,
            modelName: "about",
        }
    );
    return about;
};
