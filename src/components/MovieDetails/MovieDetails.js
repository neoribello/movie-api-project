import axios from 'axios';
import React, { useState, useEffect } from "react";
import moment from 'moment';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkIcon from '@material-ui/icons/Link';

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';

import "../MovieDetails/MovieDetails.scss";
import noImg from "../../Assets/no-image.png"

const api_key  = "e68f0e35dcc5a1bd27bfaedc41d3c894";
const BASE_URL = "https://api.themoviedb.org/3";

const getImagePoster = (path) => `https://image.tmdb.org/t/p/w300/${path}`;
const getImageBackdrop = (path) => `https://image.tmdb.org/t/p/original/${path}`;
const getImageCast = (path) => {
  if(null === path) {
    return `${noImg}`
  } else {
    return `https://image.tmdb.org/t/p/w300/${path}`
  }
}


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
    width: 25,
    height: 25,
  }

}));

function MovieDetails() {
  const [detail, setDetail] = useState([]);
  const [image, setImage] = useState([]);
  const [credit, setCredit] = useState([]);
  const [social, setSocial] = useState([]);
  const [review, setReview] = useState([]);
  const [showLess, setShowLess] = useState(false);
  

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
      console.log("credits",res.data.cast, res.data.crew)
      setCredit(res.data.cast, res.data.crew)
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

  const handleView = (e, reviewId) => {
    
  }


  const classes = useStyles();

  const getColour = (r) => {
    return r > 5.0 ? "#21d07a" : r < 5.0 ? "red" : "white";
  }

  const changeLanguage = (lang) => {
    if (lang === 'en') {
      return 'English';
    }

    if (lang === 'ja') {
      return 'Japanese';
    }

    if (lang === 'fr') {
      return 'French';
    }

    if (lang === 'ko') {
      return 'Korean';
    }
  }

  const changeZero = (check) => {
    if (check === 0) {
      return '-';
    } else {
      return `$${new Intl.NumberFormat().format(check)}`
    }
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
                  <div className="header-contents__title">
                    <h1>{item.title}
                      <span>({moment(item.release_date).format("YYYY")})</span>
                    </h1>
                    <p>{moment(item.release_date).format("L")}</p>
                  </div>
                    <div className="header-contents__facts">
                      <CircularProgressbar
                        className={classes.voteBar}
                        value={item.vote_average * 10}
                        text={`${item.vote_average * 10}%`}
                        strokeWidth={10}
                        styles = {buildStyles({
                          textColor: "white",
                          pathColor: getColour(Number(item.vote_average)),
                          trailColor: '#204529',
                          }
                        )}
                      />
                      <div class="user-score">User <br /> Score</div>
                    </div>

                  <h3>Overview</h3>
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
                <h4>
                  Reviews
                </h4>
                  <section className="reviws-container">
                  {review.length > 0 ? (
                    review.map((r, i) => (
                      <div key={i} className="reviews-content">
                      <p>A review by {r.author}</p>
                      <div>
                      <p>{ showLess ? `${r.content.slice(0, 250)}...` : r.content }</p>
                        <a
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={(e) => { setShowLess(!showLess); handleView(r.id)}}
                        >
                          &nbsp;View {showLess ? "More" : "Less"}
                        </a>
                      </div>
                    </div>
                    ))
                  ) : (
                    <p className="no-review">We don't have any reviews for {item.title}</p>
                  )}
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

                      <li className="social-link__item homepage">
                        <a className="social-link" rel="noreferrer" target="_blank" href={`${item.homepage}`}>
                            <LinkIcon
                              className={classes.largeIcon} 
                            />
                        </a>
                      </li>
                    </ul>
                  </div>
                ))}
              <p className="status">
                <strong>Status</strong>
                {item.status}
              </p>

              <p className="status">
                <strong>Original Language</strong>
                {changeLanguage(item.original_language)}
              </p>

              <p className="status">
                <strong>Budget</strong>
                {changeZero(item.budget)}
              </p>

              <p className="status">
                <strong>Revenue</strong>
                {changeZero(item.revenue)}
              </p>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieDetails;