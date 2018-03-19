import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

import '../../styles/css/index.css';

class AddNewNote extends Component {
	state = {
		title: '',
		text: '',
	};

	cancelAddNewNoteClickHandler = _ => {
		this.setState({ title: '', text: '' });

		this.props.cancelAddNewNoteClickHandler();
	};

	addNewNoteClickHandler = _ => {
		this.props.addNoteHandler(this.state);

		this.setState({ title: '', text: '' });
	};

	inputHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div className="AddNewNote">
				{!this.props.appIsAddingNote ? null : (
					<div className="IsAddingNewNote">
						<form className="NewNote">
							<input
								className="NewNote__title"
								onChange={this.inputHandler}
								type="text"
								name="title"
								value={this.state.title}
								placeholder="title"
							/>

							<TextareaAutosize
								className="NewNote__text"
								onChange={this.inputHandler}
								type="text"
								name="text"
								value={this.state.text}
								placeholder="note"
							/>
						</form>

						<div
							className="NewNote__button"
							onClick={this.addNewNoteClickHandler}
						>
							add note
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default AddNewNote;
