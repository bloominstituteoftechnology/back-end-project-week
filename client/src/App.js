import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Layout from "./component/layout/Layout";
import NoteList from "./container/notes/NoteList";
class App extends Component {
	render() {
		console.log("[app.js] testing");
		return (
			<Layout>
				<Route path="/" component={NoteList} />
			</Layout>
		);
	}
}

export default App;
