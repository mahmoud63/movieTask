import React, { useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    width: "20%",
    margin: "1.5%",
    display: "inline-block",
  },
});
const Dashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const resetInputField = () => {
    setSearchValue("");
  };

  const getMovies = (e) => {
    e.preventDefault();
    console.log(searchValue);
    let search = { searchValue };
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      url: `${process.env.REACT_APP_API_URL}/movies/getMovies`,
      data: search,
    }).then((result) => {
      let da = result.data.movies;

      console.log(da);
      setData([]);
      setData(da);
      resetInputField();
    });
  };

  return (
    <>
      <form className="search">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <input type="submit" value="SEARCH" onClick={getMovies} />
      </form>
      {data.length == 0 ? (
        <h4>NO DATA FOUND</h4>
      ) : (
        data.map(function (object, i) {
          return (
            <div className={classes.root} key={object.id}>
              {" "}
              <Movie mov={object} />
            </div>
          );
        })
      )}
    </>
  );
};

export default Dashboard;
