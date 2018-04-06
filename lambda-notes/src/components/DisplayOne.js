import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/DisplayOne.css';
import SideBar from './SideBar';
import { editNote, deleteNote, addNote } from '../actions';
import EditNote from './EditNote';

class DisplayOne extends Component {
  state = {
    note: {},
    title: '',
    body: '',
    edited: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const singleNote = this.props.notes.filter(note => note._id === id)[0];
    this.setState({ note: singleNote });
  }
  
  toggleDelete = () => {
    this.props.deleteNote(this.state.note._id, this.props.history);
  };

  toggleEdit = () => {
    this.setState({ edited: !this.state.edited });
  };

  createClone = e => {
    e.preventDefault();
    const cloned = {
      title: this.state.note.title,
      body: this.state.note.body,
    };
    this.props.addNote(cloned, this.props.history);
  }

  render() { 

    return (
      <div>
        {this.state.edited ? (
          <EditNote
            editNote={this.editNote}
            id={this.state.note._id}
            history={this.props.history}
          />
        ) : (
          <div className="container">
            <SideBar />
            <div className="notes-container">
              <div className="links-parent-container">
                <div className="links-container">
                  <div className="edit-delete"
                  onClick={this.toggleEdit}
                  >
                  edit
                  </div>
                  <div className="edit-delete"
                  onClick={this.createClone}
                  >
                  clone
                  </div>
                  <div 
                  className="edit-delete"
                  onClick={this.toggleDelete}
                  >
                  delete
                  </div>
                </div>
              </div>
              <div className="note-title">{this.state.note.title}</div>
              <div className="note-body">{this.state.note.body}</div>
            </div>
          </div> 
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes, 
  };
};
  
export default connect(mapStateToProps, { editNote, deleteNote, addNote })(DisplayOne);