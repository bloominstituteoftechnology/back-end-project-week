import React from "react";
import { connect } from "react-redux";
import { deleteNote } from "../../store/actions/note";
const DeleteNote = props => {
	let { user_id, id } = props.match.params;
	return (
		<div className="modal__page">
			<div className="modal">
				<button
					onClick={() => {
						props.deleteNote(id, user_id);
						props.history.goBack();
					}}
				>
					Delete note
				</button>
				<br />
				<button onClick={() => props.history.goBack()}> Cancle </button>
			</div>
		</div>
	);
};
export default connect(
	null,
	{ deleteNote }
)(DeleteNote);
