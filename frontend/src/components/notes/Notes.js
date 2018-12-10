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
									return handleSubmit(note._id);
								}}
								deleteNote={() => {
									console.log('click');
									return deleteNote(note._id);
								}}
								handleChange={handleChange}
								key={note._id}
								title={note.title}
								id={note._id}
								textBody={note.textBody}
								showMenu={showMenu}
								getAllNotes={getAllNotes}
								editTitle="editTitle"
								editBody="editBody"
							/>
						))}
					</div>
				</React.Fragment>
			);
		}
	}
}

export default connectStore(NoteContainer);
