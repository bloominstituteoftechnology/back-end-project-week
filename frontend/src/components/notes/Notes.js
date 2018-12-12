import React from 'react';
import { connectStore } from '../store/index.js';
import Spinner from '../layout/Spinner';
import Note from './Note';

class NoteContainer extends React.Component {
	state = {
		title: this.props.title,
		text: this.props.textBody
	};

	componentDidMount() {
		setInterval(() => {
			this.props.getAllNotes();
		}, 5000);
	}

	render() {
		const { notes, showMenu, getAllNotes, handleChange, handleSubmit, deleteNote } = this.props;

		if (notes === undefined || notes.length === 0) {
			return <Spinner />;
		} else {
			return (
				<React.Fragment>
					<h3 className="text-center mb-4">Your Notes</h3>
					<div className="row">
						{notes.map((note) => (
							<Note
								handleSubmit={() => {
									return handleSubmit(note.id);
								}}
								deleteNote={() => {
									return deleteNote(note.id);
								}}
								handleChange={handleChange}
								key={note.id}
								title={note.title}
								id={note.id}
								textBody={note.content}
								showMenu={showMenu}
								getAllNotes={getAllNotes}
								editTitle="editTitle"
								editBody="editBody"
								created_at={note.created_at}
							/>
						))}
					</div>
				</React.Fragment>
			);
		}
	}
}

export default connectStore(NoteContainer);
