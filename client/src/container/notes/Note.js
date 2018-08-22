import React, { Component } from "react";
import { connect } from "react-redux";
import { getANote } from "../../store/actions/note";
import { Link } from "react-router-dom";
import "./notes.css";
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
			<div className="card">
				<Link to={`/notes/${id}/user/${user_id}`}> Heading </Link>
				<Link to={`/notes/${id}/user/${user_id}/delete`}>Delete </Link>
				<div> {text} </div>
			</div>
		) : (
			<div className="cardXl" />
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
