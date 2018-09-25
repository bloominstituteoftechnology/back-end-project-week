import React, { Component } from 'react';
import axios from 'axios';

class EditNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: props.notes,
			note: {},
			title: "",
			textBody: "",
			id: ""
			}
		}

	componentDidMount() {
	    const noteID = this.props.match.params.id;
		this.getNote(noteID);
	};

	getNote = noteID => {
		axios
			.get(`http://localhost:9000/api/notes/${noteID}`)
			.then(response => {
				this.setState({
				  title: response.data.title,
				  textBody: response.data.textBody,
				  id: response.data._id
				});
				console.log(response.data);
			  })
			  .catch(err => {
				console.log(err);
			});
	}

	updateNote = (event) => {
		event.preventDefault();
		const updatedNote = {
            id: this.state.note.id,
            title: this.state.title,
            textBody: this.state.textBody,
		};

		axios
			.put(`http://localhost:9000/api/notes/${this.state.id}`, updatedNote)
			.then(response => {
				console.log(response.data, updatedNote);
			})
			.catch(error => {
				console.error('Server error', error)
			});
			this.props.history.push("/")
	};

	handleInput = event => {
		this.setState({ [event.target.name]: event.target.value });
		console.log('title is now: ' + this.state.title);
		console.log('TextBody is now: ' + this.state.textBody);
	};
	
	render() {
		return (
		<div className="newnote-container">
			<h3 className="newnote-title">Edit Note:</h3>
			<form className="newnote-form" >
				<input 
					onChange={this.handleInput}
					
					name="title"
					placeholder={ this.state.title } 
					type="text"
					className="note-title-input"
				/>
				<input 
					onChange={this.handleInput}
					
					name="textBody"
					placeholder={ this.state.textBody }
					type="text"
					className="note-content-input"
				/>
				<button type="submit" onClick={this.updateNote}>Update</button>
			</form>
		</div>
		);
	}
}


export default EditNote;