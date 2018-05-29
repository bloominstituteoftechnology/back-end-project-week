import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleModal, toggleCollabModal, addNote } from '../actions';
import '../styles/Note.css';

class Note extends React.Component {
  cloneNote = (event) => {
    const { title, content } = this.props.selectedNote;
    this.props.addNote({ title, content });
  }

  addCollaborator = (event) => {
    this.props.toggleCollabModal()
  }
  
  render() {
    return (
      <div className="note__container">
        <div className="note__options">
          <Link to={`/edit/${this.props.selectedNote._id}`}>
            <div className="note__option-item">edit</div>
          </Link>
          <Link to={'/'} onClick={this.cloneNote} >
            <div className="note__option-item">copy</div>
          </Link>
          <div className="note__option-item" onClick={this.props.toggleModal}>
            delete
          </div>
          <div className="note__option-item" onClick={this.addCollaborator}>
            add collaborator
          </div>
        </div>
        <div className="note">
          <div className="note__title">{this.props.selectedNote.title}</div>
          <div className="note__content">{this.props.selectedNote.content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedNote: state.selectedNote,
  };
};

export default connect(mapStateToProps, { toggleModal, toggleCollabModal, addNote })(Note);
