import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../actions';
import '../../styles/NoteForm.css';


class NoteForm extends Component {
    state = {
        title: '',
        content: '',
    };

    
    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    handleAddNote = _ => {
        const { title, content } = this.state;
        this.props.createNote(title, content);
        this.setState({ title: '', content: '' });
    };

    render() {
        return (
            <form className="input__form" autoComplete="off" >
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
                value={this.state.content}
                name="content"
                type="text"
                placeholder="Enter text here..."
                onChange={this.handleInputChange}
                />
                <button className="input__button" onClick={() => this.handleAddNote()} type="button">
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