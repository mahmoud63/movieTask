const axios = require("axios").default;
const Movie = require("../models/movie");

exports.getMovies = async (req, res) => {
  try {
    let { searchValue } = req.body;
    console.log(req.body);

    const movies = await axios({
      method: "post",

      headers: {
        "Content-Type": "application/json",
      },
      url: `http://www.omdbapi.com/?s=${searchValue}&apikey=8da0f42e`,
    });
    console.log(movies.data.Search);
    if (!movies.data.Search) return res.status(200).send({ movies: [] });

    if (movies.data.Search)
      return res.status(200).send({ movies: movies.data.Search });
  } catch (err) {
    console.log(err);
  }
};
exports.addFav = async (req, res) => {
  try {
    console.log(req.body);
    let addedMovies = await Movie.findAll({
      where: { UserID: req.userData.userId, imdbID: req.body.imdbID },
    });
    if (addedMovies.length == 0) {
      let added = await Movie.create({
        Title: req.body.Title,
        Year: req.body.Year,
        imdbID: req.body.imdbID,
        Type: req.body.Type,
        Rate: 0,
        Poster: req.body.Poster,
        UserID: req.userData.userId,
      });
      if (added) {
        res.status(200).send({ msg: "added" });
      }
    } else {
      res.status(200).send({ msg: "existed movie in fav list" });
    }
  } catch (err) {
    console.log(err);
  }
};
//  let addedMovies = Movie.findAll({
//    where: { UserID: req.userData.userId, imdbID: movie.imdbID },
//  });

exports.rate = async (req, res) => {
  try {
    console.log(req.body);
    let addedMovies = await Movie.findAll({
      where: { UserID: req.userData.userId, imdbID: req.body.mov.imdbID },
    });
    if (addedMovies.length == 0) {
      let added = await Movie.create({
        Title: req.body.mov.Title,
        Year: req.body.mov.Year,
        imdbID: req.body.mov.imdbID,
        Type: req.body.mov.Type,
        Rate: req.body.rate,
        Poster: req.body.mov.Poster,
        UserID: req.userData.userId,
      });
      if (added) {
        res.status(200).send({ msg: "rated, and added to your fav list" });
      }
    } else {
      let updatedMovie = await Movie.update(
        { Rate: req.body.rate },
        { where: { UserID: req.userData.userId, imdbID: req.body.mov.imdbID } }
      );
      if (updatedMovie) {
        res.status(200).send({ msg: "rated!" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "something went wrong" });
  }
};
exports.fav = async (req, res) => {
  let favList = await Movie.findAll({
    where: { UserID: req.userData.userId },
  });
  console.log("favList");

  res.status(200).send({ msg: favList });
};
