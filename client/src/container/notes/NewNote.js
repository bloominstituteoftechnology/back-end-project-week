import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote } from "../../store/actions/note.js";
class NewNote extends Component {
	state = {
		heading: "",
		body: ""
	};
	inputHandlers = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	addNote = e => {
		// add new note
		e.preventDefault();
		this.props.addNote({ text: this.state.body });
		this.setState({ heading: "", body: "" });
	};
	render() {
		console.log(this.props);
		return (
			<form className="form" onSubmit={this.addNote}>
				<div className="form-group">
					<label htmlFor="heading"> Heading </label>
					<input
						type="text"
						name="heading"
						id="heading"
						value={this.state.heading}
						onChange={this.inputHandlers}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="body"> body </label>
					<input
						type="text"
						name="body"
						id="body"
						value={this.state.body}
						onChange={this.inputHandlers}
					/>
				</div>
				<button type="submit"> Add new Note </button>
			</form>
		);
	}
}

export default connect(
	null,
	{ addNote }
)(NewNote);
