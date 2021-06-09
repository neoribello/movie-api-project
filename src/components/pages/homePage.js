import React, { Component } from "react";
import MovieList from '../MovieList/MovieList';
import MovieFilter from '../MovieList/MovieFilter';
import { Container } from "@material-ui/core"

class HomePage extends Component {
  render() {
    return (
    <Container maxWidth="lg">
        <div className="homepage-container">
          <MovieFilter className="movie-left"/>
          <MovieList className="movie-right"/>
        </div>
      </Container>
    );
  }
}

export default HomePage;
