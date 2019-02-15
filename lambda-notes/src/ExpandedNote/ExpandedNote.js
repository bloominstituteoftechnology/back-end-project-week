import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styles from '../ExpandedNote/ExpandedNote.css'


class ExpandedNote extends React.Component{
    constructor(){
        super()
        this.state = {
            note: []
        }
    }

   
  
    render(){
        let note = this.props.notes.find(
            note => `${note.id}` === this.props.match.params.id
          );
        return(
            
            <div className = 'expanded-note-container'>
                <div className = 'expanded-note-edit-container'>
                    <Link className ='edit-link'exact to ='/edit'>EDIT</Link>
                    <div className = 'delete-link' >DELETE</div>
                </div>
                <div className = 'expanded-note-sub-container'>
                    <div className = 'expanded-note-sub-sub-container'>    
                        <h2 className = 'expanded-title-header'>{note.title}</h2>
                        <div className = 'expanded-content'>{note.content}</div>
                    </div>    
                </div>
            </div>
        )
    }
}

export default ExpandedNote;