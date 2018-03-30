import React, { Component } from 'react';
import marked from 'marked';
import './note.css';
// loadNotesFromServer() {
// 		axios.get('http://localhost:8080/notes')
// 			 .then(res => {
// 			 	this.setState({ data: res.data });
// 			 })
// 	}

class Note extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toBeUpdated: false,
			title: '',
			body: ''
		}

		this.deleteNote = this.deleteNote.bind(this);
		this.updateNote = this.updateNote.bind(this);
		// this.loadNotesFromServer = this.loadNotesFromServer.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
	}

	updateNote(e) {
		e.preventDefault();
		this.setState({ toBeUpdated: !this.state.toBeUpdated });
	}

	// loadNotesFromServer() {
	// 	axios.get('http://localhost:8080/notes')
	// 		 .then(res => {
	// 		 	this.setState({ title: res.data.title, body: res.data.body });
	// 		 })
	// }

	handleNoteUpdate(e) {
		e.preventDefault();
		let id = this.props.data.uniqueID;
		let title = (this.state.title) ? this.state.title : null;
		let body = (this.state.body) ? this.state.body: null;
		let note = { title: title, body: body };

		this.props.onNoteUpdate(id, note);
		this.setState({
			toBeUpdated: !this.state.toBeUpdated,
			title: '',
			body: ''
		})
	}

	deleteNote(e) {
		e.preventDefault();
		let id = this.props.uniqueID;
		this.props.onNoteDelete(id);
		console.log('oops deleted');
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleBodyChange(e) {
		this.setState({ body: e.target.value });
	}

	rawMarkup() {
		let rawMarkup = marked(this.props.children.toString());
		return { __html: rawMarkup };
	}
	render() {
		return (
 			<div>
 				<h3>{this.props.title}</h3>
 				<span dangerouslySetInnerHTML={ this.rawMarkup() } />
 				<input type="submit"
 					   value="UPDATE"
 					   className="form-submit"
 					   onClick={this.updateNote}
 				/>
 				<input type="submit"
 					   value="DELETE"
 					   className="form-submit"
 					   onClick={this.deleteNote}
 				/>
 				{ (this.state.toBeUpdated)
 					? (
 						<div className="note-center">
 							<div className="card">
 								<form onSubmit={ this.handleNoteUpdate }>
 									<input
 										type='text'
 										placeholder='Update title...'
 										value={ this.state.title }
 										onChange= { this.handleTitleChange }
 										className="form-item" />
 									<input
 										type='text'
 										className="form-item"
 										placeholder='Update the body of your note…'
 										value={ this.state.body }
 										onChange={ this.handleBodyChange } />
 									<input
 										type='submit'
 										value='UPDATE'
 										className="form-submit" />
 								</form>
 							</div>
 						</div>)
 						: null}
 			</div>
 		)
 	}
}

export default Note;