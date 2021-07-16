import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../components/header.scss';
import logo from '../Assets/logo-tmbd.svg'

const Header = () => {
	const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
      setScroll(window.pageYOffset > 50)
      );
    }
  }, []);
  return (
		<div className={`navigation ${scroll ? "scroll" : ""}`}>
			<ul className="navigation-links__container">
				<div className="navigation-links">
					<img className="nav-logo" src={logo} alt="Logo"/>
					<Link to='/'>
						<li className="nav-link">Home</li>
					</Link>
					<Link to='/search'>
						<li className="nav-link">Search</li>
					</Link>
				</div>
			</ul>
		</div>
  )
}
export default Header
