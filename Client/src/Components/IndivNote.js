import React from 'react';


const IndivNote = (props) =>{
    return (
        <div className="indiv-note-container">
            <div className="indiv-note-wrapper"> 
                <div>
                    <h3 className="note-title">{props.note_title}</h3>
                    <hr />
                    <p className="note-body">{props.note_body}</p>
                </div>
            </div>
        </div>
    );
}  

export default IndivNote;