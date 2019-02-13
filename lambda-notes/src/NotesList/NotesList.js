import React from 'react';
import Note from '../Note/Note';
import styles from '../NotesList/NotesList.css'

class NotesList extends React.Component{
   
    render(){
        return(
          <div className ='notes-list-container'>
            <div className = 'notes-sub-container'> {this.props.notes.map(note =>{
                return(
                    <Note 
                        id = {note.id}
                        key = {note.id}
                        title = {note.title}
                        content = {note.content}
                    />
                ) })}

            </div>
        </div>
        )
    }
}

export default NotesList;