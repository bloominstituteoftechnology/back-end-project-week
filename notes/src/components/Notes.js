import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotes, deleteNote } from '../actions';
import { logout } from '../actions/user';
import UpdateForm from './UpdateForm';
import AddForm from './AddForm';
import { withRouter } from 'react-router-dom';

class Notes extends Component {
	componentDidMount() {
		this.props.getNotes();
	}

	showUpdateBox = (elem, id) => {
		const element = document.getElementById(elem);
		element.style.display = 'block';
		document.getElementById(`update-button${id}`).style.display = 'none';
		document.getElementById(`done-button${id}`).style.display = 'block';
		document.getElementById(`delete-button${id}`).style.display = 'block';
	}

	hideUpdateBox = (elem, id) => {
		const element = document.getElementById(elem);
		element.style.display = 'none';
		document.getElementById(`update-button${id}`).style.display = 'block';
		document.getElementById(`done-button${id}`).style.display = 'none';
		document.getElementById(`delete-button${id}`).style.display = 'none';
	}

	render() {
		const { notes, fetchingNotes, deleteNote, history } = this.props;
		return (
			<div className='notes'>
				<div className='logout'>
					<button
						className='secondary-button'
						onClick={() => this.props.logout({ history })}>Logout
					</button>
				</div>
				<div className='notes__add-form'>
					<h1>Create new note</h1>
					<AddForm />
				</div>
				{fetchingNotes ? (<div className='loading-msg'>Loading...</div>) :
					(<ul className='notes-grid'>
						{notes.map((note) => {
							return (
								<div className='note' key={note._id}>
									<li>
										<div className="note-title">{note.title}</div>
										<div className="note-text">{note.text}</div>
									</li>
									<div id={`update-box${note._id}`} className='notes_update-form'>
										<UpdateForm id={note._id}/>
									</div>
									<div className='note-buttons'>
										<button
											id={`update-button${note._id}`}
											className='update-button'
											onClick={() => this.showUpdateBox(`update-box${note._id}`, note._id)}>
											Edit
										</button>
										<button
											id={`delete-button${note._id}`}
											className='delete-button'
											onClick={() => deleteNote(note._id)}>
											Delete
										</button>
										<button
											id={`done-button${note._id}`}
											className='done-button'
											onClick={() => this.hideUpdateBox(`update-box${note._id}`, note._id)}>
											Done
										</button>
									</div>
								</div>
							);
						})}
					</ul>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notes: state.notes.notes,
		fetchingNotes: state.notes.fetchingNotes,

		error: state.notes.error
	}
}

export default withRouter(connect(mapStateToProps, { getNotes, deleteNote, logout })(Notes));
