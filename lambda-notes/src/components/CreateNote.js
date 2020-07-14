import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchNotes } from '../actions';
const config = require("../_config");

class CreateNote extends Component {
    state = {
        title: '',
        content: ''
    }

    handleNewNote = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    addNote = (event) => {
        event.preventDefault();
        axios.post(`${config.devBackend}/notes`, this.state)
            .then(() => {
                this.props.fetchNotes();
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        console.log(this.props)
        return (
            <div className="create-view">
                <form>
                    <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleNewNote}
                    />
                    <textarea
                    type="text"
                    placeholder="Write note here..."
                    name="content"
                    value={this.state.content}
                    onChange={this.handleNewNote}
                    />
                    <button onClick={this.addNote}>
                        Add Note
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        notes: store[0].notes
    };
};

export default connect(mapStateToProps, { fetchNotes })(CreateNote);