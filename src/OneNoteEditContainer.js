import React, { Component } from "react";
import SidebarContainer from "./components/sidebar/SidebarContainer";
import "./App.css";
import { addNote } from "./components/actions/actions";
import { connect } from "react-redux";
import OneNoteEdit from "./components/NotesContainer/OneNoteEdit";
import Axios from "axios";

class OneNoteEditContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render(props) {
		return (
			<div className="App">
				<SidebarContainer />
				<OneNoteEdit {...props} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	notes: state.notes
});

export default connect(
	mapStateToProps,
	{ addNote }
)(OneNoteEditContainer);
