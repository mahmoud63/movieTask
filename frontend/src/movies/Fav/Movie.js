import React from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import axios from "axios";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ mov }) => {
  const rate = (rate) => {
    let sendData = { rate, mov };
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      url: `${process.env.REACT_APP_API_URL}/movies/rate`,
      data: sendData,
    })
      .then((result) => {
        toast.success(result.data.msg);
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  const poster = mov.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : mov.Poster;
  console.log(mov);
  return (
    <div className="movie">
      <div>
        <img
          width="200"
          height="300"
          alt={`mm`}
          src={poster}
          key={mov.imdbID}
        />
      </div>
      <p style={{ width: "300px" }} key={mov.imdbID}>
        {mov.Title}
      </p>
      <div style={{ width: "300px" }}>
        <ReactStars
          count={5}
          key={mov.imdbID}
          value={mov.Rate}
          size={24}
          activeColor="#ffd700"
          onChange={rate}
        />
      </div>
    </div>
  );
};

export default Movie;
