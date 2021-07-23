import React from "react";
import MovieList from '../MovieList/MovieList';
import { Container } from "@material-ui/core"

export default function HomePage() {
  return (
  <Container maxWidth="lg">
      <div className="homepage-container">
        {/* <MovieFilter className="movie-left"/> */}
        <MovieList className="movie-right"/>
      </div>
    </Container>
  );
}


