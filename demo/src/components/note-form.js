import React, { Component } from 'react';
import AuthService from './auth';
import './note-form.css';

class NoteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: ''
		};
		this.Auth = new AuthService();
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleBodyChange(e) {
		this.setState({ body: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		// console.log(`${this.state.title} says \"${this.state.body} \"`)
		let title = this.state.title;
		let body = this.state.body;
		if (!title || !body) {
			return;
		}
		// this.props.onNoteSubmit({ title: title, body: body });
		this.Auth.addNote(title, body);
		this.setState({ title: '', body: '' });
	}

	render() {
		return (
			<div className="note-center">
				<div className="card">
					<form onSubmit={this.handleSubmit}>
						<input 
							type="text"
							placeholder="Type title here..."
							value={this.state.title}
							onChange={this.handleTitleChange}
							className="form-item"
						/>
						<input 
							type="text"
							placeholder="Say anything you want!"
							value={this.state.body}
							onChange={this.handleBodyChange}
							className="form-item"
						/>
						<input 
							type="submit"
							value="ADD NOTE"
							className="form-submit"
						/>
					</form>
				</div>
			</div>
		)
	}
}

export default NoteForm;