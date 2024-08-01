"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("MarkDownBlogs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },
            urlImageBanner: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            like: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("MarkDownBlogs");
    },
};
