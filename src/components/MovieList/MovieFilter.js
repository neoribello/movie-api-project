import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const api_key  = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function MovieFilter(props) {
  const [data, setData] = useState([]);

  const api = axios.create({ baseURL: BASE_URL });
  const getFilter = api.get("/discover/movie?sort_by=popularity.desc&page=2", { params: { api_key } });
  const filterMovies = `https://api.themoviedb.org/3/discover/movie?&api_key=${api_key}&query=`;

  useEffect(() => {
    getFilter.then(response => {
      setData(response.data);
      console.log("filter data: ", response.data);
    });
  }, []);

  const history = useHistory();
  
  const handleClick = (movieId) => {
    console.log("movie item", movieId)
    history.push(`/movie/${movieId}`)
  };

  const classes = useStyles();

  return (
    <div>
      <div className="movielist-filter">
        <div classname="filter-container">
          <p>Movie Filter</p>
        </div>

        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </div>
    </div>
  );
}

export default MovieFilter;