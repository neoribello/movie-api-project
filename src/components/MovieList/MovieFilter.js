import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieFilter(props) {
  const [data, setData] = useState([]);

  const api = axios.create({ baseURL: BASE_URL });
  const getFilter = api.get("/discover/movie", { params: { api_key } });

  useEffect(() => {
    getFilter.then(response => {
      setData(response.data);
      console.log("filter data: ", response.data);
    });
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <div className="movielist-filter">
        <div classname="filter-container">
          <p>Movie Filter</p>
        </div>
      </div>
    </div>
  );
}

export default MovieFilter;