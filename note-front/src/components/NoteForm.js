import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions';
import '../styles/NoteForm.css';


class NoteForm extends Component {
    state = {
        id: '',
        title: '',
        text: '',
        user: ''
    };

    
    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    handleAddNote = _ => {
        const { title, text, user } = this.state;
        this.props.createNote({ title, text, user });
        this.setState({ id: '', title: '', text: '', user: '' });
    };

    render() {
        return (
            <form className="input__form">
                <input
                className="input"
                value={this.state.title}
                name="title"
                type="text"
                placeholder="Title"
                onChange={this.handleInputChange}
                />
                <input
                className="input"
                value={this.state.text}
                name="text"
                type="text"
                placeholder="Enter text here..."
                onChange={this.handleInputChange}
                />
                <input
                className="input"
                value={this.state.user}
                name="user"
                type="text"
                placeholder="User"
                onChange={this.handleInputChange}
                />
                <button onClick={() => this.handleAddNote()} type="button">
                    Add New Note
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    createNote: state.createNote
  };
};

export default connect(mapStateToProps, { createNote })(NoteForm);