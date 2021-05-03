import React, { useEffect, useState } from "react";
import axios from "axios";

//components
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './components/pages/homePage';

//css
import './Assets/css/default.min.css';

function App() {

  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
