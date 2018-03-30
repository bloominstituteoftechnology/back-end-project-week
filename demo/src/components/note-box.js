import React, { Component } from 'react';
import NoteList from './note-list';
import NoteForm from './note-form';
import axios from 'axios';

class NoteBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.loadNotesFromServer = this.loadNotesFromServer.bind(this);
		this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
		this.handleNoteDelete = this.handleNoteDelete.bind(this);
		this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
	}

	loadNotesFromServer() {
		axios.get('http://localhost:8080/notes')
			 .then(res => {
			 	this.setState({ data: res.data });
			 })
	}

	// handleNoteSubmit(note) {
	// 	axios.post(this.props.url, note)
	// 		 .then(res => {
	// 		 	this.setState({ data: res });
	// 		 })
	// 		 .catch(err => {
	// 		 	console.error(err);
	// 		 })
	// }

	handleNoteSubmit(note) {
		let notes = this.state.data;
		note.id = Date.now();
		let newNotes = notes.concat([note]);
		this.setState({ data: newNotes });
		axios.post('http://localhost:8080/notes', note)
			 .catch(err => {
			 	console.error(err);
			 	this.setState({ data: notes })
			 })
	}

	handleNoteDelete(id) {
		axios.delete(`http://localhost:8080/notes/${id}`)
			 .then(res => {
			 	console.log('note deleted');
			 })
			 .catch(err => {
			 	console.error(err);
			 });
	}

	handleNoteUpdate(id, note) {
		axios.put(`http://localhost:8080/notes/${id}`, note)
			 .catch(err => {
			 	console.log(err);
			 })
	}

	componentDidMount() {
		this.loadNotesFromServer();
		setInterval(this.loadNotesFromServer, this.props.pollInterval)
	}

	render() {
		return (
			<div>
				<NoteList onNoteDelete={this.handleNoteDelete} onNoteUpdate={this.handleNoteUpdate} data={this.state.data}/>
				<NoteForm onNoteSubmit={this.handleNoteSubmit}/>
			</div>
		)
	}
}

export default NoteBox;