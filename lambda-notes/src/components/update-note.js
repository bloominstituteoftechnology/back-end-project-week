import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateNote, addNote } from '../actions/index';

class UpdateNote extends Component {
	state = {
		title: this.props.note.title,
		body: this.props.note.body
	};

	handleInputChange = event => {
		this.setState({[event.target.name] : event.target.value });
	};

	handleUpdateNote = _ => {
		const { title, body } = this.state;
		this.props.addNote({ title, body });
	};

	render() {
		return(
			<form>
				<input
					type="text"
					value={this.state.title}
					placeholder={this.state.title}
					onChange={this.handleInputChange}
					name="title"
				/>
				<div className="text-box">
					<input 
						type="text"
						value={this.state.body}
						placeholder={this.state.body}
						onChange={this.handleInputChange}
						name="body"
					/>
				</div>
				<input 
					type="submit"
					value="Update Note"
					onClick={() => {
						this.handleUpdateNote();
					}}
				/>
			</form>
		)
	}
}

const mapStateToProps = state => {
	return {
		error: state.error,
		updatingNote: state.updatingNote
	}
}

export default withRouter(connect(mapStateToProps, { updateNote, addNote })(UpdateNote));