import React, { Component } from "react";
import { connect } from "react-redux";
import { getANote } from "../../store/actions/note";
import { Link } from "react-router-dom";

class Note extends Component {
	componentDidMount() {
		if (this.props.match) {
			let { id, user_id } = this.props.match.params;
			this.props.getANote(id, user_id);
		}
	}
	render() {
		let { id, text, user_id } = this.props;
		let renderNote = text ? (
			<div>
				<Link to={`/notes/${id}/user/${user_id}`}> Heading </Link>
				<div> {text} </div>
			</div>
		) : (
			<div>
				{" "}
				<Link to={`/notes`}> All notes </Link> {this.props.note.text}
			</div>
		);
		return renderNote;
	}
}
const mapStateToProps = state => ({
	note: state.note.note
});
export default connect(
	mapStateToProps,
	{ getANote }
)(Note);
