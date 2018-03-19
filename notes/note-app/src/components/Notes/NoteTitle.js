import React, { Component } from 'react';

import '../../styles/css/index.css';

class NoteTitle extends Component {
	state = {
		title: '',
	};

	componentDidMount() {
		this.setState({ title: this.props.title });
	}

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.title !== this.state.title) {
	// 		this.setState({ title: nextProps.title });
	// 	}
	// }

	handleInputChange = e => {
		this.setState({ title: e.target.value });
	};

	checkIfEnter = e => {
		if (e.keyCode === 13) {
			this.props.editTitleHandler(this.state.title);
		}
	};

	checkIfTextChanged = _ => {
		if (this.state.title !== this.props.title) {
			this.props.editTitleHandler(this.state.title);
		}
	};

	render() {
		return (
			<div className="NoteTitle">
				<input
					className="NoteTitle__input"
					onChange={this.handleInputChange}
					type="text"
					value={this.state.title}
					onKeyUp={this.checkIfEnter}
					onBlur={this.checkIfTextChanged}
				/>
			</div>
		);
	}
}

export default NoteTitle;
