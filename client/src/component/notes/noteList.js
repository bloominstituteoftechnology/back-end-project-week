import React from "react";
import Note from "../../container/notes/Note";
import { Route, Switch } from "react-router-dom";
const NoteList = ({ notes, note }) => {
	console.log("[Notelist.js] testing");
	return (
		<div>
			<Switch>
				<Route
					path="/notes/:id/user/:user_id"
					component={props => <Note {...note} {...props} />}
				/>
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
