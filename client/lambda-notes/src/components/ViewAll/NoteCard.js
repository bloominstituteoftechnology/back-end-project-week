import React from 'react';
import '../../App.css';
import SketchFieldDemo from './SketchField';

const NoteCard = props => {
    return (
        <div className ='card shadow-drop-2-tl'>
            
                <h3 className = 'noteCardTitle '> {props.title} </h3>
                <p>{props.content}</p>
                
            

            
        </div>
    )
}

export default NoteCard;