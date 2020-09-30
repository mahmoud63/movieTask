const { host, user, password, database } = require('../config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vw', 'root', 'admin', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
