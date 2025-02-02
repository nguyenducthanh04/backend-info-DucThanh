"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MarkDownBlog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MarkDownBlog.hasMany(models.comment, {
                foreignKey: "blogId",
            });
        }
    }
    MarkDownBlog.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: DataTypes.TEXT,
            description: DataTypes.TEXT,
            contentHTML: DataTypes.TEXT("long"),
            contentMarkdown: DataTypes.TEXT("long"),
            urlImageBanner: DataTypes.TEXT,
            view: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: "MarkDownBlog",
        }
    );
    return MarkDownBlog;
};
