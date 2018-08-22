import React from "react";
import Aux from "../../hoc/Aux";
import Nav from "./Nav";
import { Link } from "react-router-dom";
const Layout = props => (
	<Aux>
		<Nav />
		<main> {props.children} </main>
	</Aux>
);
export default Layout;
