const Sequelize = require('sequelize');

const sequelize = require('../DB/DBConnection');

const User = sequelize.define('Users', {
  ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Active: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = User;
