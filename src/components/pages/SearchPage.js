import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {  useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CustomPagination from "../Pagination/CustomPagination";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import getImageCast from "../../hooks/useNoImage";

//css
import "../MovieSearch/MovieSearch.scss";
import "../MovieList/MovieList";

const api_key  = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function SearchPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  
  const api = axios.create({ baseURL: BASE_URL });
  const getTrending = api.get(`movie/popular?api_key=${api_key}&page=1`, { params: { api_key } });
  const getSearch = api.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchTerm}&page=${currentPage}&include_adult=false`, { params: { api_key } });

  useEffect(() => {
    getSearch.then(response => {
      setData(response.data.results);
      setNumOfPages(response.data.total_pages)
    })
  }, [currentPage, getSearch])

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
    <div className="searchBox-container">
      <TextField
        className="searchBox"
        placeholder="Search for a movie"
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>

    <div className="searchpage-container">
    {data.map((movie, i) => (
      <li key={i} onClick={() => handleClick(movie.id)} className="movielist-items">
        <img alt="movie-poster" src={getImageCast(movie.poster_path)} />
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
    
    {numOfPages > 1 && (
          <CustomPagination setCurrentPage={setCurrentPage} numOfPages={numOfPages} />
    )}
    </div>
  </div>
  );
}


