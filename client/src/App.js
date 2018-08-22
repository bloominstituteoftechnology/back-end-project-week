import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Layout from "./component/layout/Layout";
import NoteList from "./container/notes/NoteList";
import Auth from "./container/auth/Auth";
class App extends Component {
	render() {
		return (
			<Layout>
				<Route path="/" component={NoteList} />
				<Route path="/Auth" component={Auth} />
			</Layout>
		);
	}
}

export default App;
