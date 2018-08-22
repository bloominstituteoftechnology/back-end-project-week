import React, { Component } from "react";
import { connect } from "react-redux";
import { getANote, deleteNote } from "../../store/actions/note";
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
				<div className="card-header">
					<ul className="nav nav-pills card-header-pills">
						<li className="nav-item">
							<Link to={`/notes/${id}/user/${user_id}`} className="nav-link">
								Heading
							</Link>
						</li>
						<li className="nav-item">
							<button
								type="button"
								className="btn btn-danger"
								data-toggle="modal"
								data-target="#exampleModal"
							>
								Delete
							</button>
						</li>
					</ul>
				</div>
				<div className="card-body">
					<div className="card-text"> {text} </div>
				</div>
				{/* Modal option to delete note */}
				<div
					className="modal fade"
					id="exampleModal"
					tabindex="-1"
					role="dialog"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">
									Delete Note
								</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body"> Deleting {text}</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-dismiss="modal"
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
									onClick={() => this.props.deleteNote(id, user_id)}
								>
									Delete note
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		) : (
			<div className="note">{this.props.note.text}</div>
		);
		return renderNote;
	}
}
const mapStateToProps = state => ({
	note: state.note.note
});
export default connect(
	mapStateToProps,
	{ getANote, deleteNote }
)(Note);
