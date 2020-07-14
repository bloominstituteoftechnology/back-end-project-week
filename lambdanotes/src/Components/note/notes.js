import React from 'react';
import { connect } from 'react-redux';
import { deleteNote } from '../actions';


const Note = props => {
  return (
    <div className="Note">
    <h1>Title:{props.note.title}</h1>
    <p>Content:{props.note.content}</p>
    <button onClick={() => props.deleteNote(props.note.id)}>Delete Note</button>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        deletingNote: state.deletingNote,
    }
}

export default connect(mapStateToProps, { deleteNote })(Note);

