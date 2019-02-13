import React from 'react';
import '../Note/Note.css';
import {NavLink} from 'react-router-dom';

const Note = (props) =>{
    return(
            <div className = 'note-container'>
                <div className ='note-sub-container'>
                    <NavLink exact to = {`/notes/${props.id}`}>
                        <h1 className = 'note-header'>{props.title}</h1>
                    </NavLink>    
                    <div className = 'note-content'>{props.content}</div>
                </div>
               
            </div>
    )
}

export default Note;