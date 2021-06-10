import React, { useEffect, useState } from "react";
import moment from 'moment';
import {  useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Link } from "@material-ui/core"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { makeStyles } from "@material-ui/core/styles";


//css
import "../MovieList/MovieList.scss";

const api_key  = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function MovieList() {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const api = axios.create({ baseURL: BASE_URL });
  const getPopular = api.get("movie/popular", { params: { api_key } });
  const searchMovies = `https://api.themoviedb.org/3/search/movie?&api_key=${api_key}&query=`;

  console.log("data: ", data)
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(searchMovies + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        console.log("search", data)
        setData(data.results);
      });

      setSearchTerm("");
    }
  }

  const handleonChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const useStyles = makeStyles(() => ({ 
  
    voteBar: {
      width: "40px",
      height: "40px",
      background: "#081c22",
      borderRadius: "100%",
      padding: "3px"
    },
  
  }));

  //Shows initial 
  const history = useHistory();
  
  useEffect(() => {
    getPopular.then(response => {
      setData(response.data.results);
      console.log(data);
    });
  }, []);

  const handleClick = (movieId) => {
    console.log("movie item", movieId)
    history.push(`/movie/${movieId}`)
  };

  const classes = useStyles();

  const getColour = (r) => {
    if(r > 5.0) {
      return "#21d07a";
    }

    if (r < 5.0) {
      return "red";
    }
  }

  
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <TextField
          className="search"
          name="query"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleonChange}>
        </TextField>
        <Button className="button" type="submit">Search</Button>
      </form>
      
      <ul className="movielist-container">
        {data.map((movie, i) => (
          <li key={i} onClick={() => handleClick(movie.id)} className="movielist-items">
            <img alt="movie-poster" src={getImage(movie.poster_path)} />
            <div className="movielist-text">
              <CircularProgressbar
                className={classes.voteBar}
                value={movie.vote_average * 10}
                text={`${movie.vote_average * 10}%`}
                strokeWidth={10}
                styles = {buildStyles({
                  textColor: "white",
                  pathColor: getColour(Number(movie.vote_average)),
                  trailColor: '#204529',
                  textSize: "30"
                  }
                )}
              />
              <p className="move-title">{movie.original_title}</p>
              <p>{moment(movie.release_date).format('LL')}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
  );
}

export default MovieList;
