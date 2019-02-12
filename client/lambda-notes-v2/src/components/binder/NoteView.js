import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteNote} from '../../actions';
import {fetchData} from '../../actions';
import '../App.css';


class NoteView extends Component {
    // constructor() {
    //     super()
    // }
    
    // componentWillUnmount() {
    //     this.props.fetchData();
    // }
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
                    {/* <button onClick={this.props.deleteNote(id)}> */}
                    {/* <button onClick={this.handleClickDelete}>
                        delete
                    </button> */}
                    {/* <a href={this.handleClickDelete}>delete</a> */}
                    {/* <Link to={`/notes/${id}/delete`}>delete</Link> */}
                    <a href='' onClick={this.handleClickDelete}>delete</a>
                </nav>
                <div>
                    <h2 className="page-title">{title}</h2>
                    <p>{content}</p>
                </div>
            </div>
        );
    };
    
    handleClickDelete = () => {
        let id = this.props.match.params.id;
        id = parseInt(id,10);        
        // alert(id)
        const result = window.confirm('                    WARNING\nTo DELETE this entry, click OK to confirm\n       (This action cannot be undone)'); 
        // eslint-disable-next-line
        result === true ?     
        this.props.deleteNote(id) :
        null
    }
    
};



const mapStateToProps = state => {
    return{
        notes: state.notes
    }
}
// const mapDispatchToProps = {
//     deleteNote
//   }

// export default connect(mapStateToProps, mapDispatchToProps)(NoteView);
export default connect(mapStateToProps, { deleteNote, fetchData })(NoteView);
