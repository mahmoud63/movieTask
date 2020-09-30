import React, { useState, useEffect } from "react";
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

  const getFavList = () => {
    axios({
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      url: `${process.env.REACT_APP_API_URL}/movies/fav`,
    }).then((result) => {
      let da = result.data.msg;
      console.log(result.data);
      setData(da);
    });
  };

  const sortByRate = () => {
    let movies = data;
    movies.sort((a, b) => (+a.Rate < +b.Rate ? 1 : +b.Rate < +a.Rate ? -1 : 0));
    setData([]);
    console.log(movies);
    setData([...movies]);
  };
  useEffect(() => {
    getFavList();
  }, []);

  return (
    <>
      <div style={{ width: "600px", padding: "5px" }}>
        <input
          style={{ width: "150px", padding: "5px" }}
          type="submit"
          value="sort by rate"
          onClick={() => {
            sortByRate();
          }}
        />
      </div>
      {data.length == 0 ? (
        <h4>NO DATA FOUND</h4>
      ) : (
        data.map((object) => {
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
