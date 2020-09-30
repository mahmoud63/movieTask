const Sequelize = require("sequelize");

const sequelize = require("../DB/DBConnection");

const Movie = sequelize.define("Movies", {
  ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Year: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imdbID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Poster: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Rate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Movie;
