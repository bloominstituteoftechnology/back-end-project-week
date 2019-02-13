import React from 'react';
import '../Note/Note.css';

const Note = (props) =>{
    return(
            <div className = 'note-container'>
                <div className ='note-sub-container'>
                    <h1 className = 'note-header'>{props.title}</h1>
                    <div className = 'note-content'>{props.content}</div>
                </div>
               
            </div>
    )
}

export default Note;