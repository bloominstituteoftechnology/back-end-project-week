import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { addNote } from '../actions';
import { deleteNote, fetchNotes } from '../actions';
import { connect } from 'react-redux';

import '../css/index.css';

class Note extends Component {

  state = {modal:false};

  styles = {
    display: 'none',
  }

  render() {
    if (this.state.modal) this.styles = Object.assign({}, { display: 'flex'});
    if (!this.state.modal) this.styles = Object.assign({}, { display: 'none'});
    return (
      <div>
        <div className="Note">
          <div className="Toolbar">
            <Link to={`/note/edit/${this.props.note.id}`} className="Toolbar__button">
              Edit
            </Link>
            <button onClick={() => this.setState({ modal: !this.state.modal})}>
              [ X ]
            </button>
            <Link to={'/'} className="Toolbar__button" onClick={() => {
                this.props.deleteNote(this.props.note.id);
                this.props.fetchNotes(localStorage.getItem('uuID'));
              }
            }>
              Delete
            </Link>
          </div>
          <div className="Note__title">
            {this.props.note.title}
          </div>
          <div className="Note__text">
            {this.props.note.text}
          </div>
        </div>
        <div id="Modal" style={this.styles}>
          This is a modal.
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('State was mapped to props.', state);
  return {
    props: state,
  }
}

export default connect(mapStateToProps, { deleteNote, fetchNotes })(Note);