import React from "react";
import Aux from "../../hoc/Aux";
import { Link } from "react-router-dom";
const Layout = props => (
	<Aux>
		<nav>
			<Link to="/notes"> All Notes </Link>
			<Link to="/notes/new"> Create New Note </Link>
			<Link to="/auth"> sign In / sign Up </Link>
		</nav>
		<main> {props.children} </main>
	</Aux>
);
export default Layout;
