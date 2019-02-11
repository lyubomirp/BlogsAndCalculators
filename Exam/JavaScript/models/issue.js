const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Issue = sequelize.define("Issue", {
        title:{
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        content:{
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        priority:{
            type: Sequelize.INTEGER,
            allowNull: false,
            required: true
        }
    });

    return Issue;
};