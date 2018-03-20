import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNote } from '../actions';
// future addition
// import Calendar from 'react-input-calendar';
//import css
import './NoteForm.css'
// add markdown feature later
// Create form for adding new notes
// title/text + (additional) date input?
class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      date: '',
      text: '',
    };
  }
 
  addNote = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitNote = event => {
    event.preventDefault();
    const note = {
      title: this.state.title,
      date: this.state.date,
      text: this.state.text,
    };
    this.props.postNote(note);
    console.log(note);
    this.setState({
      title: '',
      date: '',
      text: '',
    });
  };
  render() {
    return (
      <div className="form">
        <form className="Add-form">
          <input
            className="title"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={this.addNote}
          />
          <input
            className="date"
            name="date"
            placeholder="date"
            value={this.state.date}
            onChange={this.addNote}
          />
          <textarea
            className="text"
            name="text"
            placeholder="text"
            rows={10}
            value={this.state.text}
            onChange={this.addNote}
          />
          <button className="Submit-button" onClick={this.submitNote}>
            Add Note
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
  };
};
// connect props, post, and form
export default connect(mapStateToProps, { postNote })(NoteForm);
