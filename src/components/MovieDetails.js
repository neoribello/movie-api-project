import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function MovieDetails() {
  const [detail, setDetail] = useState([]);
  const { movie_id } = useParams();

  const api = axios.create({ baseURL: BASE_URL });
  const getDetails = api.get(`movie/${movie_id}`, { params: { api_key } });

  useEffect(() => {
    getDetails.then(res => {
      console.log(res.data)
      setDetail([res.data])
    })
  }, []);

  return (
    <div>
      {detail.map((item, i) => (
        <div key={i}>
          <p>{item.title}</p>
          <img src={getImage(item.poster_path)} />
          <p>{item.overview}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieDetails;