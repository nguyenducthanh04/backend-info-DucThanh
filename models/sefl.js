"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class sefl extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    sefl.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            urlAvatar: DataTypes.TEXT,
            job: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            birthday: DataTypes.STRING,
            hometown: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "sefl",
        }
    );
    return sefl;
};
