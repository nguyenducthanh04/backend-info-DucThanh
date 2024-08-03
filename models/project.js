"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    project.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nameProject: DataTypes.STRING,
            urlImage: DataTypes.TEXT,
            urlPage: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "project",
        }
    );
    return project;
};
