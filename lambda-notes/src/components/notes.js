import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import Note from './note';
import { connect } from 'react-redux';
import { deleteNote, updateNote, toggleShowUpdate } from '../actions';
import UpdateNote from './update-note';
import CreateNoteForm from './create-note-form';
import { withRouter } from 'react-router';

class Notes extends Component {

	handleDeleteNote = () => {
		const { id } = this.props.noteSelected;
		this.props.deleteNote(id);
	}

	handleShowNote = note => {
		this.props.updateNote(note);
	}

	toggleShowUpdate = () => {
		this.props.toggleShowUpdate();
	}

	render() {
		return (
			<div>
				<ul>
					{this.props.notes.map(note => {
						return (
							<li onClick={() => this.handleShowNote(note)} key={note.id}>
								{note.title}
							</li>
						);
					})}
				</ul>
				{Object.keys(this.props.noteSelected).length > 0 ? (
					<Note 
						handleShowNote={this.handleShowNote}
						toggleShowUpdate={this.toggleShowUpdate}
						handleDeleteNote={this.handleDeleteNote}
						selected={this.props.noteSelected}
					/>
					) : null}
				{this.props.showUpdate ? (
					<UpdateNote note={this.props.noteSelected}/>
					) : null}
				{this.props.deletingNote ? (
					<img src={logo} className="App-logo" alt="logo" />
					) : null}
				<CreateNoteForm />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		deletingNote: state.notesReducer.deletingNote,
		notes: state.notesReducer.notes,
		error: state.notesReducer.error,
		showUpdate: state.noteReducer.showUpdate,
		noteSelected: state.noteReducer.noteSelected
	};
};

export default withRouter(connect(mapStateToProps, {
	deleteNote,
	updateNote,
	toggleShowUpdate
})(Notes));