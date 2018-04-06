import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleCollabModal, addNote } from '../actions';
import '../styles/CollabModal.css';

class CollabModal extends React.Component {
  state = {
    email: '',
  };

  handleSubmit = event => {
    this.props.toggleCollabModal();
    this.props.addNote({
      ...this.props.selectedNote,
      username: this.state.email,
    });
  };

  handleInput = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <div className="modal">
        <div className="modal__box">
          <div className="modal__box-text">
            Enter the email of the user you'd like to add:
          </div>
          <div >
            <form onSubmit={this.handleSubmit} className="modal__box-form" >
              <input type="email" value={this.state.email} name="email" onChange={this.handleInput} className="modal__box-field" />
              <input type="submit" value="Add user" className="modal__box-button"/>
            </form>
          </div>
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

export default connect(mapStateToProps, { toggleCollabModal, addNote })(
  CollabModal
);
