import React, { Component } from "react";
import MovieList from '../MovieList/MovieList';
import MovieFilter from '../MovieList/MovieFilter';
import { Container } from "@material-ui/core"

class HomePage extends Component {
  render() {
    return (
    <Container maxWidth="lg">
        <div className="homepage-container">
          <MovieFilter />
          <MovieList />
        </div>
      </Container>
    );
  }
}

export default HomePage;
