import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchNotes } from '../actions';
const config = require("../_config");

class EditNote extends Component {
    state = {
        title: ``,
        content: ``
    };

    matchedNote = this.props.notes.filter(note => {
        return note._id == this.props.match.params.id
    })[0];

    componentDidMount() {
        this.setState({title: this.matchedNote.title, content: this.matchedNote.content})
    };

    handleEditNote = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    edit = (event) => {
        event.preventDefault();
        const noteObj = {
            title: this.state.title,
            content: this.state.content
        }
        axios.put(`${config.devBackend}/notes/${this.props.match.params.id}`, noteObj)
            .then(() => {
                this.props.fetchNotes();
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return (
            <div className="edit-view">
                <form>
                    <input
                        name="title"
                        value={this.state.title}
                        onChange={this.handleEditNote}
                    />
                    <textarea
                        name="content"
                        value={this.state.content}
                        onChange={this.handleEditNote}
                    />
                    <button onClick={this.edit}>Submit</button>
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

export default connect(mapStateToProps, { fetchNotes })(EditNote);