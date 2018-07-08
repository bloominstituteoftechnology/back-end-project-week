import React from 'react';


const IndivNote = (props) =>{
    return (
        <div className="indiv-note-container">
            <div className="indiv-note-wrapper"> 
                <div>
                    <h3 className="note-title">{props.title}</h3>
                    <hr />
                    <p className="note-body">{props.body}</p>
                    <p>~ {props.author}</p>
                </div>
            </div>
        </div>
    );
}  

export default IndivNote;