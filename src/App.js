import React, { useEffect, useState } from "react";
import axios from "axios";

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
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
