import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from './notes';
import { getNote } from '../actions';



// class NoteList extends Component {

//     render () {
//         return (
//             <div>
//                {this.props.note.map(note =>{
//                 return <Note note={note} />
//             })}
//             </div>
//         );
//     }
// }
const NoteList = props => {
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
        note: state.note,
        getNote: state.getNote
    }
}
export default connect(mapStateToProps, { getNote })(NoteList);