import React, { Component } from 'react';
import axios from 'axios';

import './NewNote.css';

class NewNote extends Component {
	state = {
		title: '',
		textBody: ''
	};

	render() {
		return (
			<div className="newnote-container">
				<h3 className="newnote-title">Create New Note:</h3>
				<form onSubmit={ this.addNote } className="newnote-form">
					<input 
						onChange={ this.handleChange }
						value={ this.state.title }
						name="title"
						placeholder="Note Title" 
						type="text"
						className="note-title-input"
					/>
					<input 
						onChange={ this.handleChange }
						value={ this.state.textBody }
						name="textBody"
						placeholder="Note Content" 
						type="text"
						className="note-content-input"
					/>
					<button type="submit">Save</button>
				</form>
			</div>
		);
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	addNote = event => {
		event.preventDefault();

		axios
		.post('http://localhost:9000/api/notes', this.state)
		.then(res => {
			console.log('Axios response', res);
			this.props.history.push('/');
		})
		.catch(error => {
			console.error('Axios response:', error)
		});
	}
	
}

export default NewNote;