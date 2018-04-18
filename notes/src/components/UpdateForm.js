import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../actions';

class UpdateNoteForm extends Component {
	state = {
		title: '',
		text: ''
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { title, text } = this.state;
		const id = this.props.id;
		const form = document.getElementById(`update-form${id}`);
		form.reset();
		this.props.updateNote(id, {title, text});
	};

	handleInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	render () {
		const id = this.props.id;
		return (
			<div className='update-form-input'>
				<form id={`update-form${id}`} onSubmit={this.handleSubmit}>
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
					<button type="submit">Save</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		updatingNote: state.notes.updatingNote,
		error: state.notes.error
	}
}

export default connect(mapStateToProps, { updateNote })(UpdateNoteForm);
