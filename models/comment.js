"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            comment.belongsTo(models.MarkDownBlog, {
                foreignKey: "blogId",
            });
            comment.belongsTo(models.User, {
                foreignKey: "userId",
            });
        }
    }
    comment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            blogId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            commentText: DataTypes.TEXT,
            parentCommentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "comment",
        }
    );
    return comment;
};
