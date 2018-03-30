import React, { Component } from 'react';
import Note from './note';
import './note-list.css';

class NoteList extends Component {
	render() {
		
		// return (
		// 	<ul>
		// 		{this.props.data.map(note => {
		// 			return (
		// 				<li>
		// 					{note.body}
		// 				</li>
		// 			)
		// 		})}
		// 	</ul>
		// )
		let noteNodes = this.props.data.map((note, i) => {
			return (
				<Note 
					title={note.title} 
					uniqueID={note._id} 
					onNoteDelete={this.props.onNoteDelete}
					onNoteUpdate={this.props.onNoteUpdate}
					key={i}>
						{note.body}
				</Note>
			)
		})
		return (
			<div className="note-center">
				<div className="card">
					<div>{noteNodes}</div>
				</div>
			</div>
			
		)
	}
}

export default NoteList;