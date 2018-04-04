import React from 'react';
import { CSVLink } from 'react-csv';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import Note from './Note';

import './NoteList.css';

const SortableList = SortableContainer(props => {
  return (
    <ul className="YourNotes-NoteList">
    {props.notes.map((note, index) => {
      return (
        <Note
          key={index}
          note={note}
          index={index}
          title={note.title}
          body={note.body}
          handleNoteIndex={props.handleNoteIndex}
        />
      );
    })}
  </ul>
  );
});

export default class NoteList extends React.Component {
  boolEmptyNotes = true;

  state = {
    notes: [...this.props.notes],
  };

  componentWillMount() {
    if(this.state.notes.length > 0) {
      this.boolEmptyNotes = false;
    } else {
      this.boolEmptyNotes = true;
    };
  };

  componentWillReceiveProps(nextProps) {
    if(this.state.notes.length > 0) {
      this.boolEmptyNotes = false;
    } else {
      this.boolEmptyNotes = true;
    };
    this.setState({
      notes: nextProps.notes,
    });
  };

  handleNoteIndex = index => {
    this.props.handleNoteViewIndex(index);
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      notes: arrayMove(this.state.notes, oldIndex, newIndex),
    });
    this.props.updateSortedNotes(this.state.notes);
  };

  render() {
    return (
      <div className="YourNotes">
        <h2 className="SectionTitle">Your Notes:</h2>
        <SortableList pressDelay={90} lockToContainerEdges={true} axis={"xy"} notes={this.state.notes} onSortEnd={this.onSortEnd} handleNoteIndex={this.handleNoteIndex} />
        {!this.boolEmptyNotes ? (
          <CSVLink className="YourNotes-CSV" data={this.state.notes} filename={"lambda-notes.csv"}>Download CSV</CSVLink>
        ) : (null)}
      </div>
    );
  };
}
