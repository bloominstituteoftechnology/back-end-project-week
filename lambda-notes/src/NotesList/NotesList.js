import React from 'react';
import Note from '../Note/Note';

class NotesList extends React.Component{
   
    render(){
        return(
          <div>{this.props.notes.map(note =>{
              return(
                  <Note 
                    id = {note.id}
                    key = {note.id}
                    title = {note.title}
                    content = {note.content}
                  />
              )
          })}</div>
        )
    }
}

export default NotesList;