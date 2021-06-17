import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//components
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';

//css
import './Assets/css/default.min.css'
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {

  return (
    <Router>
    <div className="App">
      <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/movie/:movie_id" component={MovieDetails} />
        </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
