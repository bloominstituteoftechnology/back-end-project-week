import React from "react";
import Note from "../../container/notes/Note";
import { Route, Switch } from "react-router-dom";

import NewNote from "../../container/notes/NewNote";
import DeleteNote from "../../container/notes/DeleteNote";
import "./notes.css";
const NoteList = ({ notes, note }) => {
	console.log("[Notelist.js] testing");
	return (
		<div className="noteList">
			<Switch>
				<Route
					path="/notes/:id/user/:user_id/delete"
					exact
					component={DeleteNote}
				/>
				<Route
					path="/notes/:id/user/:user_id"
					component={props => <Note {...note} {...props} />}
				/>
				<Route path="/notes/new" component={NewNote} />
				<Route
					path="/notes"
					exact
					render={props => notes.map(i => <Note key={i.id} {...i} />)}
				/>
			</Switch>
		</div>
	);
};

export default NoteList;
