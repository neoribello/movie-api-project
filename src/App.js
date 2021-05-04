import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//components
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './components/pages/homePage';

//css
import './Assets/css/default.min.css'
import MovieDetails from "./components/MovieDetails";

function App() {

  return (
    <Router>
    <div className="App">
      <Header />
      <HomePage />
      <Footer />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movie/:movie_id" component={MovieDetails} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
