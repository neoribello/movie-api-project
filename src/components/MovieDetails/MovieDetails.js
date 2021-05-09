import axios from 'axios';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';

import "../MovieDetails/MovieDetails.scss";

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";

const getImagePoster = (path) => `https://image.tmdb.org/t/p/w300/${path}`;
const getImageBackdrop = (path) => `https://image.tmdb.org/t/p/original/${path}`;


const useStyles = makeStyles((theme) => ({ 
  header: {
    backgroundPosition: "right -200px top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },

  custom_bg: {
    backgroundImage: "linear-gradient(to right, rgba(4.31%, 3.14%, 3.92%, 1.00) 150px, rgba(4.31%, 3.14%, 3.92%, 0.84) 100%)",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  voteBar: {
    width: "70px",
    height: "70px",
    background: "#081c22",
    borderRadius: "100%",
    padding: "5px"
  }

}));

function MovieDetails() {
  const [detail, setDetail] = useState([]);
  const [image, setImage] = useState([]);
  const [credit, setCredit] = useState([]);

  const { movie_id } = useParams();

  const api = axios.create({ baseURL: BASE_URL });
  const getDetails = api.get(`movie/${movie_id}`, { params: { api_key } });
  const getImages = api.get(`/movie/${movie_id}/images`, { params: { api_key } });
  const getCredits = api.get(`/movie/${movie_id}/credits`, { params: { api_key } });


  useEffect(() => {
    getDetails.then(res => {
      console.log(res.data)
      setDetail([res.data])
    })

    getImages.then(res => {
      setImage([res.data])
    })

    getCredits.then(res => {
      console.log("credits", res.data)
      setCredit([res.data])
    })
  }, []);

  const classes = useStyles();

  const getColour = (r) => {
    return r > 5.0 ? "green" : r < 5.0 ? "red" : "white";
  }

  return (
    <div>
      {detail.map((item, i) => (
        <div key={i}>

          {/* Header */}
          {image.map((elem, i) => (
            <div key={i} style={{
              backgroundImage: `url(${getImageBackdrop(elem.backdrops[0].file_path)})`,
              height: `${elem.backdrops[0].height}`
              }} 
              className={classes.header}
            >
            <div className={classes.custom_bg}>
              <div className="header-contents__container">
                <img className="header-contents__image" src={getImagePoster(item.poster_path)} alt="movie-poster" />
                <div className="header-contents__text">
                  <h1>{item.title}</h1>

                  <CircularProgressbar
                    className={classes.voteBar}
                    value={item.vote_average * 10}
                    text={`${item.vote_average * 10}%`}
                    strokeWidth={10}
                    styles = {buildStyles({
                      textColor: "white",
                      pathColor: getColour(Number(item.vote_average)),
                      }
                    )}
                  />
                  <p>{item.tagline}</p>
                  <p>{item.overview}</p>
                </div>
              </div>
            </div>
            </div>
          ))}
          {/* Header */}

        </div>
      ))}
    </div>
  );
}

export default MovieDetails;