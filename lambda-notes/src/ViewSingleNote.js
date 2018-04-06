import React, { Component } from 'react';
import axios from 'axios';
import './ViewSingleNote.css';
import LeftColumnPanel from './LeftColumnPanel';

class ViewSingleNote extends Component {
  state = {
    Title: '',
    Content: '',
  };

  componentDidMount() {
    axios.get('http://localhost:4444/notes').then((response) => {
      this.setState(() => response.data.find(note => note.id === Number(this.props.match.params.id)));
    })
    .catch((error) => {
      alert('Server error: Please try again later.');
      window.location.href = '/';
    });
  }

  componentDidUpdate() {
    let noteHeight = window.getComputedStyle(document.getElementById('note')).getPropertyValue('height');
    noteHeight = Number(noteHeight.substring(0, noteHeight.length - 2));
    const windowHeight = document.documentElement.clientHeight;
    document.getElementById('Home').style.height = noteHeight > windowHeight ? `${noteHeight}px` : 'calc(100vh - 2px)';
  }

  toggleDeleteModal() {
    document.getElementById('delete-modal').classList.toggle('delete-modal--display');
    document.getElementById('opaque-shield').classList.toggle('opaque-shield--display');
  };

  processDelete(id) {
    axios.delete(`http://localhost:4444/notes/${id}`).then(() => {
      window.location.href = '/';
    })
    .catch((error) => {
      alert('Server error: Please try again later.');
      this.toggleDeleteModal();
    });
  };

  redirectEdit(id) {
    window.location.href = `/editnote/${id}`;
  };

  render() {
    const id = this.props.match.params.id;
    return (
      <div id="Home">
        <LeftColumnPanel />
        <div className="note" id="note">
          <div className="note__link note__edit-link" onClick={() => this.redirectEdit(id)}>edit</div>
          <div className="note__link note__delete-link" onClick={this.toggleDeleteModal}>delete</div>
          <div className="note__title">{this.state.Title}</div>
          <div className="note__content">{this.state.Content}</div>
        </div>
        <div className="delete-modal" id="delete-modal">
          <div className="delete-modal__warning">Are you sure you want to delete this?</div>
          <div className="delete-modal__button delete-modal__delete-button" onClick={() => this.processDelete(id)}>
            Delete
          </div>
          <div className="delete-modal__button delete-modal__cancel-button" onClick={this.toggleDeleteModal}>
            No
          </div>
        </div>
        <div className="opaque-shield" id="opaque-shield" />
      </div>
    );
  }
}

export default ViewSingleNote;
