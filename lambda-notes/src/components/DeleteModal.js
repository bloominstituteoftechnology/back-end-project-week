import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteNote, toggleDelete } from '../actions';

class DeleteModal extends Component {
  
  handleDeleteMoDal = () => {
    this.props.deleteNote(this.props.modal.deleteId);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="modal">
        <div className="modal-box">
          <div className="modal-prompt">
            <p>Are you sure you want to delete this?</p>
          </div>
          <div className="modal-button">
            <button className="modal-delete" onClick={() => {this.handleDeleteMoDal()}}>Delete</button>
            <button className="modal-cancel" onClick={() => {this.props.toggleDelete()}}>No</button>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

export default connect(mapStateToProps, { deleteNote, toggleDelete })(DeleteModal);