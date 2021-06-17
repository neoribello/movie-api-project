import React, { useEffect, useState } from "react";
import moment from 'moment';
import {  useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Link } from "@material-ui/core"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { makeStyles } from "@material-ui/core/styles";
import CustomPagination from "../Pagination/CustomPagination";


//css
import "../MovieList/MovieList.scss";

const api_key  = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function MovieList() {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const api = axios.create({ baseURL: BASE_URL });
  const getPopular = api.get(`movie/popular?api_key=${api_key}&page=${currentPage}`, { params: { api_key } });
  
  useEffect(() => {
    getPopular.then(response => {
      setData(response.data.results);
      setNumOfPages(response.data.total_pages)
      console.log("response.data.total_pages", response.data.total_pages);
    });
  }, [currentPage, getPopular]);

  const history = useHistory();
  const handleClick = (movieId) => {
    console.log("movie item", movieId)
    history.push(`/movie/${movieId}`)
  };
  
  const getColour = (r) => {
    if(r > 7.5) {
      return "#21d07a";
    }

    if (r < 5.0) {
      return "red";
    }

    if(r > 5.1 || r < 7.5) {
      return "yellow";
    }
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
  const classes = useStyles();

  return (
    <div>
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
      {numOfPages > 1 && (
        <CustomPagination setCurrentPage={setCurrentPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default MovieList;
