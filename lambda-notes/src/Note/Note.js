import React from 'react';

const Note = (props) =>{
    return(
        <div>
            <h1>{props.title}</h1>
            <div>{props.content}</div>
        </div>
    )
}

export default Note;