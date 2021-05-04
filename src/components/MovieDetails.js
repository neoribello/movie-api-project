import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function MovieDetails(props) {
  const [detail, setDetail] = useState([])
  const { movie_id } = useParams();

  const api = axios.create({ baseURL: BASE_URL });
  const getDetails = api.get(`movie/${movie_id}`, { params: { api_key } });
  

  useEffect(() => {
    getDetails.then(res => {
      console.log("details data",res.data)
      setDetail(res.data)
    })
  }, [])

  return (
    <div>
      {detail.map((movie) => (
          <li className="movielist-items">
            <img src={getImage(movie.poster_path)} />
            <p>{movie.original_title}</p>
            <p>{movie.vote_average}</p>
          </li>
        ))}
    </div>
  );
}

export default MovieDetails;