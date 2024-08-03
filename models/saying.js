"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class saying extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    saying.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            namePerson: DataTypes.STRING,
            imagePerson: DataTypes.TEXT,
            saidPerson: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "saying",
        }
    );
    return saying;
};
