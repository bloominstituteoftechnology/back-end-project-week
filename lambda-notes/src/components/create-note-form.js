import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote } from '../actions/index';
import { withRouter } from 'react-router';

class CreateNoteForm extends Component {
	state = {
		title: '',
		body: ''
	};

	handleInputChange = event => {
		this.setState({[event.target.name] : event.target.value});
	};

	handleAddNote = _ => {
		const { title, body } = this.state;
		this.props.addNote({ title, body });
		this.setState({ title: '', body: '' });
	};

	render() {
		return(
			<form>
				<input 
					type="text"
					value={this.state.title}
					placeholder="Title"
					onChange={this.handleInputChange}
					name="title"
				/>
				<div className="text-box">
					<input
						type="text"
						value={this.state.body}
						placeholder="Type something..."
						onChange={this.handleInputChange}
						name="body"
					/>
				</div>
				<input 
					type="submit"
					value="Add New Note"
					onClick={() => this.handleAddNote()}
				/>
			</form>
		)
	}
}

const mapStateToProps = state => {
	return {
		error: state.error,
		addingNote: state.addingNote
	};
};

export default withRouter(connect(mapStateToProps, { addNote })(CreateNoteForm));