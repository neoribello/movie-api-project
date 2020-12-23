import React, { useEffect, useState } from "react";
import axios from "axios";

//css

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function MovieList() {
  const [data, setData] = useState([]);

  const api = axios.create({ baseURL: BASE_URL });

  const getUpcoming = api.get("movie/upcoming", { params: { api_key } });

  useEffect(() => {
    getUpcoming.then(response => {
      setData(response.data.results);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        {data.map((movie) => (
          <div>
            <img src={getImage(movie.poster_path)} />
            <p>{movie.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
