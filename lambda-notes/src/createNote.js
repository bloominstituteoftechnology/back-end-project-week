import React from 'react';
import axios from 'axios';
import LeftColumnPanel from './LeftColumnPanel';
import './createNote.css';

class CreateNote extends React.Component {
	state = {
		 Title: '',
		 Content: ''
  }

	submitNote = (event) => {
		event.preventDefault();
    axios.post('http://localhost:4444/notes/', this.state).then(() => {
      window.location.href = '/';
    })
    .catch((error) => {
      alert('Server error: Please try again later.');
    });	
	}

	newTitle = (event) => {
		this.setState({
      Title: event.target.value
	  });
	};
   
	newContent = (event) => {
		this.setState({
      Content: event.target.value
		});
	};

	render() {
		return (
      <div>
				<LeftColumnPanel />
				<div className="create-note">
					<p>Create New Note:</p>
					<input className="Titleinsertbox" type="text" placeholder="Note Title" onChange={this.newTitle} />
					<textarea className="Contentinsertbox" type="text" placeholder= "Note Content" onChange={this.newContent} />
					<button className="save" onClick={this.submitNote}>Save</button>
				</div>
			</div>
		);
	}
}

export default CreateNote;
