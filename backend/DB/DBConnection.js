const { host, user, password, database } = require("../config");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("vw", "app", "KIMO!@#321kimo", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
