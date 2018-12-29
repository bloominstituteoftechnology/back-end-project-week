import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class NoteView extends Component {

    render() {
        let id = this.props.match.params.id;
        //10 is the 'radix' base number for math, w/ js. Always 10.
        id = parseInt(id,10);
        let title;
        let content;
        this.props.notes.map((note) => {
            // if (note.id == id) {
            if (note.id === id) {
                title = note.title;
                content = note.content;
            }
            //return not needed, from react warning
            return (title && content);
        });
        
        return(
            <div>
                <nav>
                    <Link to={`/notes/${id}/edit`}>edit</Link>
                    <Link to={`/notes/${id}/delete`}>delete</Link>
                </nav>
                <div>
                    <h2 className="page-title">{title}</h2>
                    <p>{content}</p>
                </div>
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