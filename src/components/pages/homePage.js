import React, { useEffect, useState, Component } from "react";
import MovieList from '../movielistComponent/movielist';

class HomePage extends Component {
    render() {
        return (
            <div className="wrap">
                Home page content here
                <MovieList />
            </div>
          );
    }
}

export default HomePage;
