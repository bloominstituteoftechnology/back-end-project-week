import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

import '../../styles/css/index.css';

class NoteText extends Component {
	state = {
		text: '',
	};

	componentDidMount() {
		this.setState({ text: this.props.text });
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return true;
	// }

	handleInputChange = e => {
		this.setState({ text: e.target.value });
	};

	checkIfTextChanged = _ => {
		if (this.state.text !== this.props.text) {
			this.props.editTextHandler(this.state.text);
		}
	};

	render() {
		return (
			<div className="NoteText">
				<TextareaAutosize
					className="NoteText__input"
					onChange={this.handleInputChange}
					type="text"
					value={this.state.text}
					onBlur={this.checkIfTextChanged}
					rows={5}
				/>
			</div>
		);
	}
}

export default NoteText;
