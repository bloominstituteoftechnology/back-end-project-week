import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions';


class NewNote extends Component {
  state = {
      title: '',
      content: '',
    };

handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddNote = () => {
    const { title, content } = this.state;
    const note = { title, content };
    this.props.createNote({});
    this.setState({ title: '', content: ''});
  };

  render () {
    return (
      <div className= 'noteList'>
          <h4> Create New Note: </h4>
        <input className='note_title'
          name="title"
          value={this.state.title}
          type="text"
          onChange={this.handleInputChange}
          placeholder="  Note Title"
        />
        <div>
           <input className='note_content'
          name="content"
          value={this.state.content}
          type="text"
          onChange={this.handleInputChange}
          placeholder="   Note Content"
        />
        </div>
        <button className="side_button" onClick={() => this.handleAddNote()}>
        Save
        </button>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    createNote: state.createNote,
  }
}



export default connect (mapStateToProps, { createNote })(NewNote);