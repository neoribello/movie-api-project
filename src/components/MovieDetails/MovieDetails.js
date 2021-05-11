import axios from 'axios';
import React, { useState, useEffect } from "react";

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';

import "../MovieDetails/MovieDetails.scss";

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";

const getImagePoster = (path) => `https://image.tmdb.org/t/p/w300/${path}`;
const getImageBackdrop = (path) => `https://image.tmdb.org/t/p/original/${path}`;
const getImageCast = (path) => `https://image.tmdb.org/t/p/w300/${path}`;


const useStyles = makeStyles(() => ({ 
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
  },

  largeIcon: {
    width: 30,
    height: 30,
  }

}));

function MovieDetails() {
  const [detail, setDetail] = useState([]);
  const [image, setImage] = useState([]);
  const [credit, setCredit] = useState([]);
  const [social, setSocial] = useState([]);
  const [review, setReview] = useState([]);

  const { movie_id } = useParams();

  const api = axios.create({ baseURL: BASE_URL });
  const getDetails = api.get(`movie/${movie_id}`, { params: { api_key } });
  const getImages = api.get(`/movie/${movie_id}/images`, { params: { api_key } });
  const getCredits = api.get(`/movie/${movie_id}/credits`, { params: { api_key } });
  const getSocials = api.get(`/movie/${movie_id}/external_ids`, { params: { api_key } });
  const getReviews = api.get(`/movie/${movie_id}/reviews`, { params: { api_key } });


  useEffect(() => {
    getDetails.then(res => {
      console.log(res.data)
      setDetail([res.data])
    })

    getImages.then(res => {
      setImage([res.data])
    })

    getCredits.then(res => {
      console.log("credits", res.data.cast)
      setCredit(res.data.cast)
    })

    getSocials.then(res => {
      console.log("socials", res.data)
      setSocial([res.data])
    })

    getReviews.then(res => {
      console.log("reviews", res.data.results)
      setReview(res.data.results)
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
          <div className="movie-details__container">
            <div className="movie-details__left">
                <h4>Top Billed Cast</h4>
                <section className="actors-container">
                  <ul className="actors-list">
                    {credit.slice(0, 9).map((cast, i) => (
                      <li className="actors-card" key={i}>
                        <img alt="actor" className="actor-image" src={getImageCast(cast.profile_path)} />
                        <p>{cast.name}</p>
                        <p>{cast.character}</p>
                      </li>
                    ))}
                  </ul>
                </section>
                <h4>Reviews</h4>
                <section className="reviwes-container">
                  {review.map((r, i) => (
                    <div key={i}>
                      <p>{r.author}</p>
                      <p>{r.content}</p>
                    </div>
                  ))}
                </section>
            </div>
            
            <div className="movie-details__right">
              {social.map((socials, i) => (
                  <div key={i}>
                    <ul className="social-link__list">
                      <li className="social-link__item">
                        <a className="social-link" rel="noreferrer" target="_blank" href={`https:/facebook.com/${socials.facebook_id}`}>
                          <FacebookIcon 
                            className={classes.largeIcon} 
                          />
                        </a>
                      </li>
                      <li className="social-link__item">
                        <a className="social-link" rel="noreferrer" target="_blank" href={`https:/twitter.com/${socials.twitter_id}`}>
                            <TwitterIcon
                            className={classes.largeIcon} 
                            />
                        </a>
                      </li>
                      <li className="social-link__item">
                        <a className="social-link" rel="noreferrer" target="_blank" href={`https:/instagram.com/${socials.instagram_id}`}>
                            <InstagramIcon 
                              className={classes.largeIcon} 
                            />
                        </a>
                      </li>
                    </ul>
                  </div>
                ))}
              <p>
                <strong>Status</strong>
                {item.status}
              </p>

              <p>
                <strong>Original Language</strong>
                {item.original_language}
              </p>

              <p>
                <strong>Budget</strong>
                {item.budget}
              </p>

              <p>
                <strong>Revenue</strong>
                {item.revenue}
              </p>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieDetails;