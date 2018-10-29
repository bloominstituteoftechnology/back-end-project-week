import React, { Component } from "react";
import { updateNote } from "../actions/actions";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class OneNoteEdit extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			title: "",
			body: "",
			id: 0
		};
		console.log(this.state);
	}
	componentDidMount = () => {
		console.log(this.props);
		const noteID = parseInt(this.props.match.params.id, 10);
		Axios.get(`http://localhost:3300/notes/${noteID}`).then(note => {
			this.setState({
				title: note.data[0].title,
				body: note.data[0].body,
				id: note.data[0].id
			});
		});
	};

	editNote = (title, body) => {
		const noteID = parseInt(this.props.match.params.id, 10);
		let updatedNote = { title, body, noteID };
		console.log(updatedNote);
		this.props.updateNote(updatedNote);
		this.props.history.push("/");
	};
	handleChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		return (
			<div className="main-container">
				<h1 className="note-header">Edit Note:</h1>
				<form className="edit-form">
					<input
						className="form titleinput-edit"
						value={this.state.title}
						name="title"
						onChange={this.handleChange}
					/>
					<textarea
						className="form bodyinput"
						value={this.state.body}
						name="body"
						onChange={this.handleChange}
					/>
					<button
						type="button"
						onClick={() => this.editNote(this.state.title, this.state.body)}
						className="savenote-button"
					>
						Update Note
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	notes: state.notes
});

export default connect(
	mapStateToProps,
	{ updateNote }
)(withRouter(OneNoteEdit));
