import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Link } from "@material-ui/core"

//css

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function MovieList() {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const api = axios.create({ baseURL: BASE_URL });
  const getPopular = api.get("movie/popular", { params: { api_key } });
  const searchMovies = "https://api.themoviedb.org/3/search/movie?&api_key=e68f0e35dcc5a1bd27bfaedc41d3c894&query=";

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


  return (
    <Container maxWidth="lg">
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
        {data.map((movie) => (
          <li onClick={() => handleClick(movie.id)} className="movielist-items">
            <img alt="movie-poster" src={getImage(movie.poster_path)} />
            <p>{movie.original_title}</p>
            <p>{movie.vote_average}</p>
            <Link
              component="button"
              variant="body2"
              color="primary"
            >
              Details
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default MovieList;
