import React from "react";
import MainHeader from "./NotesHeader";
import MainNotes from "./NotesList";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

function NotesMainContainer() {
	return (
		<div className="main-container">
			<MainHeader />
			<MainNotes />
		</div>
	);
}

export default DragDropContext(HTML5Backend)(NotesMainContainer);
