import React, { Component } from 'react';

class EditNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: props.notes,
			note: {},
			title: "",
			textBody: "",
			}
		}

	componentDidUpdate(prevProps) {
		if (prevProps.notes !== this.props.notes) {
			this.setState({
			notes: this.props.notes
			});
		}
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
		console.log('title is now: ' + this.state.title);
		console.log('TextBody is now: ' + this.state.textBody);
	};
	
	render() {
		return (
		<div className="newnote-container">
			<h3 className="newnote-title">Edit Note:</h3>
			<form className="newnote-form" onSubmit={(event) => { 
				event.preventDefault(); this.props.editNote(
					event, this.props.match.params.id, 
					this.state.title, 
					this.state.textBody) }}>
				<input 
					onChange={this.handleInputChange}
					value={this.state.title}
					name="title"
					placeholder="Title" 
					type="text"
					className="note-title-input"
				/>
				<input 
					onChange={this.handleInputChange}
					value={this.state.content}
					name="textBody"
					placeholder="Text"
					type="text"
					className="note-content-input"
				/>
				<button onClick={this.handleSubmit}>Update</button>
			</form>
		</div>
		);
	}
}


export default EditNote;