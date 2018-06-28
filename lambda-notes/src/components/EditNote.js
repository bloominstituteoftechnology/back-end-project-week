import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editNote } from '../actions';

class EditNote extends Component {
    state = {
        title: ``,
        content: ``,
        _id: this.props.match.params._id
    };

    matchedNote = this.props.notes.filter(note => {
        return note._id == this.props.match.params._id
    })[0];

    componentDidMount() {
        this.setState({title: this.matchedNote.title, content: this.matchedNote.content})
    };

    handleEditNote = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    edit = (event) => {
        event.preventDefault();
        this.props.editNote(this.state);
        this.setState({ 
            _id: `${this.props.match.params._id}`,
            title: `${this.props.match.params.title}`,
            content: `${this.props.match.params.content}` });
        console.log("params id", this.props.match.params._id);
        window.location.href = "/";
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
        notes: store
    };
};

export default connect(mapStateToProps, { editNote })(EditNote);