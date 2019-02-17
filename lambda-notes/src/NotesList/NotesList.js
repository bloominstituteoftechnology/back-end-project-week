import React from 'react';
import Note from '../Note/Note';
import styles from '../NotesList/NotesList.css'

class NotesList extends React.Component{
   constructor(){
       super()
       this.state = {

       }
   }
//    titleChopper = (title) =>{
//         if(title.indexOf(' ').length > 5){
//             console.log('long');
//         }
//    }
  // var streetaddress= addy.substr(0, addy.indexOf(',')); 
    render(){
        return(
          <div className ='notes-list-container'>
            <div className = 'flex'>
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
        </div>
        )
    }
}

export default NotesList;