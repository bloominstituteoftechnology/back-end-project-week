import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions';

class AddNoteForm extends Component {
	state = {
		title: '',
		text: ''
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { title, text } = this.state;
		const form = document.getElementById('add-form');
		form.reset();
		this.props.createNote({title, text});
	};

	handleInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	render () {
		return (
			<div className='add-form-input'>
				<form id='add-form' onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="title"
						placeholder="title"
						value={this.state.title}
						onChange={this.handleInput}
					/>
					<textarea
						rows='6'
						cols='40'
						type="text"
						name="text"
						placeholder="text"
						value={this.state.text}
						onChange={this.handleInput}
					></textarea>
					<button type="submit">Create Note</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		addingNote: state.notes.addingNote,
		error: state.notes.error
	}
}

export default connect(mapStateToProps, { createNote })(AddNoteForm);
