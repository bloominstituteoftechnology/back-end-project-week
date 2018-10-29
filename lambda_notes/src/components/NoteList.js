import  React from 'react';
import './Note.css';
// import '../../public/mdhtmlform';

const NoteList =(props) =>{
    return (
        <div className="notelist-wrapper">
            <h1>Your Notes:</h1>
            <div className="note-card-container">
                {props.noteList.map(note => (
                    <div className="note-card" 
                        key={note._id}
                        onClick={() => props.history.push(`/note/${note._id}`)}>
                        <h2 className="mdhtmlform-html note-title"
                        data-mdhtml-group="0">{note.title}</h2>
                        <hr></hr>
                        <p className="mdhtmlform-html note-textBody"
                        data-mdhtml-group="1">{note.textBody}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NoteList;