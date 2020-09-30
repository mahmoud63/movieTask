const { host, user, password, database } = require("../config");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  /*Database Name*/ "vw",
  /*user*/ "",
  /*Password*/ "",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
