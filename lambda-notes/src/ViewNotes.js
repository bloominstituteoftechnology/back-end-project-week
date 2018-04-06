import React, { Component } from 'react';
import axios from 'axios';
import LeftColumnPanel from './LeftColumnPanel';
import NoteDisplay from './NoteDisplay';
import './ViewNotes.css';

class ViewNotes extends Component {
	state = {
    notes: [],
  };
  
  componentDidMount() {
    axios.get('http://localhost:4444/notes').then((response) => {
      this.setState(() => ({ notes: response.data }));
    })
    .catch((error) => {
      alert('Server error: Please try again later.');
    });
  }
	
	componentDidUpdate() {
    let listHeight = window.getComputedStyle(document.getElementById('list')).getPropertyValue('height');
    listHeight = Number(listHeight.substring(0, listHeight.length - 2)) + 27;
    const windowHeight = document.documentElement.clientHeight;
    document.getElementById('Home').style.height = listHeight > windowHeight ? `${listHeight}px` : 'calc(100vh - 2px)';
  }

	processRedirect(note) {
		window.location.href = `/viewsinglenote/${note.id}`;
	};
	
	render() {
		return (
			<div className="Home" id="Home">
				<LeftColumnPanel />
				<div className="Notes">
					<div className="Note-title">Your Notes:</div>
					<div className="note-grid" id="list">
						{this.state.notes.map((note, i) => {
							return (
								<div key={i} id={note.id} onClick={() => this.processRedirect(note)}>
									<NoteDisplay notetitle={note.Title} noteContent={note.Content} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default ViewNotes;
