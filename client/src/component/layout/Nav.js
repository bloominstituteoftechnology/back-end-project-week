import React from "react";
import { Link } from "react-router-dom";
const Nav = props => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<Link to="/" className="navbar-brand">
			Home
		</Link>
		<Link to="/notes"> All Notes </Link>
		<Link to="/notes/new"> Create New Note </Link>
		<Link to="/auth"> sign In / sign Up </Link>
		<button
			className="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span className="navbar-toggler-icon" />
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link to="/notes" className="nav-link">
						All Notes
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/notes/new" className="nav-link">
						Create New Note
					</Link>
				</li>
			</ul>
		</div>
	</nav>
);
export default Nav;
