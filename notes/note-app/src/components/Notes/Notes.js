import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote, deleteNote } from '../../actions';

import Note from './Note';

import '../../styles/css/index.css';

class Notes extends Component {
	state = {
		notes: [],
		displayNotes: [],
		isEditingAllNotes: false,
		isViewingSingleNote: false,
		colorClicked: { id: -1, color: '' },
	};

	componentDidMount() {
		this.setState({ notes: this.props.notes, displayNotes: this.props.notes });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.notes.length !== this.props.notes)
			this.setState({ notes: nextProps.notes, displayNotes: nextProps.notes });
	}

	detailedNoteView = note => {
		this.setState({ displayNotes: [note], isViewingSingleNote: true });
		this.props.disableStatusBarButtonsHandler();
	};

	returnToAllNotes = _ => {
		this.setState({
			displayNotes: [...this.state.notes],
			isViewingSingleNote: false,
		});
		this.props.disableStatusBarButtonsHandler();
	};

	deleteNoteButtonClickedHandler = noteId => {
		this.setState({ isViewingSingleNote: false });
		this.props.disableStatusBarButtonsHandler();
		this.props.deleteNote(noteId);
	};

	addSelf = note => {
		// this.props.addNote(note);
	};

	colorClickedHandler = (noteId, colorClicked) => {
		this.setState({ id: noteId, color: colorClicked });
	};

	render() {
		return (
			<div className="Notes">
				{this.state.displayNotes
					.filter(
						note =>
							note.title.includes(this.props.searchQuery) ||
							note.text.includes(this.props.searchQuery),
					)
					.map(note => {
						return (
							<div key={note.id} className="NotesNoteContainer">
								<div className="NoteStatusBar">
									{this.state.isViewingSingleNote ? null : (
										<div
											className="NoteDeleteButton"
											onClick={_ =>
												this.deleteNoteButtonClickedHandler(note.id)
											}
										>
											&#x2715;
										</div>
									)}

									{this.state.isViewingSingleNote ? null : (
										<div className="ChangeColorButtons">
											<div
												className="ChangeColorButton"
												style={{ background: '#ff8080' }}
												onClick={_ =>
													this.colorClickedHandler(note.id, '#ff8080')
												}
											/>

											<div
												className="ChangeColorButton"
												style={{ background: '#90ee90' }}
											/>

											<div
												className="ChangeColorButton"
												style={{ background: '#ffff7e' }}
											/>

											<div
												className="ChangeColorButton"
												style={{ background: '#c1e1ec' }}
											/>

											<div
												className="ChangeColorButton"
												style={{ background: 'white' }}
											/>
										</div>
									)}

									{this.state.isViewingSingleNote ? null : (
										<div
											className="NoteEditSingleButton"
											onClick={_ => this.detailedNoteView(note)}
										>
											<span role="img" aria-label="magnifying-glass">
												&#x1f50d;
											</span>
										</div>
									)}
								</div>

								<div className="NoteContainer">
									<Note
										note={note}
										colorClicked={
											this.state.colorClicked.id === note.id
												? this.state.colorClicked.color
												: null
										}
										isViewingSingleNote={this.state.isViewingSingleNote}
										returnToAllNotes={this.returnToAllNotes}
									/>
								</div>
							</div>
						);
					})}

				{this.props.searchQuery === '' ? (
					<div className="NotesNoteContainer" style={{ display: 'none' }}>
						<div className="NoteStatusBar">
							{this.state.isViewingSingleNote ? null : (
								<div
									className="NoteDeleteButton"
									onClick={_ => this.deleteNoteButtonClickedHandler(-1)}
									style={{ display: 'none' }}
								>
									&#x2715;
								</div>
							)}

							{this.state.isViewingSingleNote ? null : (
								<div
									className="NoteEditSingleButton"
									onClick={_ => this.detailedNoteView({})}
									style={{ display: 'none' }}
								>
									<span role="img" aria-label="magnifying-glass">
										&#x1f50d;
									</span>
								</div>
							)}
						</div>

						<div className="NoteContainer">
							<Note note={{ id: -1, title: '', text: '' }} />
						</div>
					</div>
				) : null}

				{this.state.displayNotes.filter(
					note =>
						note.title.includes(this.props.searchQuery) ||
						note.text.includes(this.props.searchQuery),
				).length === 0 ? (
					<div className="NotesNoSearchResults">No search results</div>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		//
	};
};

export default connect(mapStateToProps, { addNote, deleteNote })(Notes);
