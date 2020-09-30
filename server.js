const express = require("express");
const path = require("path");

const cors = require("cors");
const sequelize = require("./backend/DB/DBConnection");
const morgan = require("morgan");

const User = require("./backend/models/user");
const Movie = require("./backend/models/movie");

const app = express();
/* using Middlewares */
app.use("/static", express.static("public/static"));
app.use(express.static("frontend/build"));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "500MB", extended: false }));
app.use(express.urlencoded({ extended: false }));

var session = require("express-session");
const { throws } = require("assert");
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
  })
);
app.disable("etag");

app.use("/api/auth", require("./backend/routes/auth"));
app.use("/api/movies", require("./backend/routes/movies"));

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

User.hasMany(Movie);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
