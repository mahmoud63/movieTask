const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authenticate").authenticateJWT;

const movie = require("../controllers/movies");

router.post("/getMovies", authenticateJWT, movie.getMovies);
router.post("/addFav", authenticateJWT, movie.addFav);
router.post("/rate", authenticateJWT, movie.rate);
router.get("/fav", authenticateJWT, movie.fav);

module.exports = router;
