import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addNote } from '../actions';

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
        let noteObj = {
            title: this.state.title,
            content: this.state.content
            // id: this.state.id,
            // createAt: this.state.createAt
        }
        this.props.addNote(noteObj);
        this.setState({title: '', content: ''});
        this.props.history.push('/');
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

export default connect(null, { addNote })(CreateNote);