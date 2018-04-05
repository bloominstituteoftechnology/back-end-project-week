import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleModal } from '../actions';
import '../styles/Note.css';

const Note = props => {
  return (
    <div className="note__container">
      <div className="note__options">
        <Link to={`/edit/${props.selectedNote._id}`}>
          <div className="note__option-item">edit</div>
        </Link>
        <div className="note__option-item" onClick={props.toggleModal}>delete</div>
      </div>
      <div className="note">
        <div className="note__title">{props.selectedNote.title}</div>
        <div className="note__content">{props.selectedNote.content}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedNote: state.selectedNote,
  };
};

export default connect(mapStateToProps, { toggleModal })(Note);
