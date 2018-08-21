import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class NoteView extends Component {

    render() {
        const id = this.props.match.params.id;
        let title;
        let content;
        this.props.notes.map((note) => {            
            if (note.id == id) {
                title = note.title;
                content = note.content;
            }
        });
        
        return(
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return{
        notes: state.notes
    }
}
export default connect(mapStateToProps)(NoteView);