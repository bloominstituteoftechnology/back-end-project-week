import React, { Component } from "react";
import Note from "./Note";
import { getNotes } from "../actions/actions";
import { connect } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import csv from "../../csv.png";
import axios from "axios";

const update = require("immutability-helper");

class MainNotes extends Component {
	state = {
		notes: this.props.notes
	};

	componentDidMount() {
		axios
			.get("http://localhost:3300/notes")
			.then(notes => {
				console.log(notes);
				this.setState({ notes: notes.data });
			})
			.catch(err => console.log(err));
		this.props.getNotes(this.props.notes);
	}
	deleteItem = id => {
		this.setState(prevState => {
			return {
				notes: prevState.notes.filter(note => note.id !== id)
			};
		});
	};

	moveCard = (dragIndex, hoverIndex) => {
		const { notes } = this.state;
		console.log(this.state);

		const dragCard = notes[dragIndex];

		this.setState(
			update(this.state, {
				notes: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
				}
			})
		);
	};
	render() {
		const headers = [
			{ label: "Title", key: "title" },
			{ label: "Body", key: "body" },
			{ label: "Date", key: "date" },
			{ label: "ID", key: "id" }
		];
		return (
			<div>
				<CSVLink
					className="csv"
					filename={"My-Notes.csv"}
					headers={headers}
					data={this.props.notes}
				>
					<button className="savenote-button-export">
						Export CSV
						<img className="csv-logo" src={csv} />
					</button>
				</CSVLink>

				<div className="note-container">
					{this.state.notes.map((note, index) => (
						<Note
							key={note.id}
							note={note}
							id={note.id}
							index={index}
							date={note.date}
							title={note.title}
							body={note.body}
							moveCard={this.moveCard}
						/>
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	notes: state.notes
});

export default connect(
	mapStateToProps,
	{ getNotes }
)(MainNotes);
