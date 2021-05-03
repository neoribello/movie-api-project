import React, { useEffect, useState, setState, setLoading } from "react";
import axios from "axios";
import { Container, TextField, Button } from "@material-ui/core"

//css

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function MovieList() {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const api = axios.create({ baseURL: BASE_URL });
  const getUpcoming = api.get("movie/upcoming", { params: { api_key } });
  const getPopular = api.get("movie/popular", { params: { api_key } });
  const searchMovies = "https://api.themoviedb.org/3/search/movie?&api_key=e68f0e35dcc5a1bd27bfaedc41d3c894&query=";

  
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
  
  useEffect(() => {
    getUpcoming.then(response => {
      setData(response.data.results);
      console.log(data);
    });
  }, []);

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
            <li className="movielist-items">
              <img src={getImage(movie.poster_path)} />
              <p>{movie.original_title}</p>
              <p>{movie.vote_average}</p>
            </li>
        ))}
      </ul>
      </Container>
  );
}

export default MovieList;
