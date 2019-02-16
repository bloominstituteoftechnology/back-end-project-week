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
    componentDidMount(){
        const id = this.props.match.params.id;
        this.fetchNote(id);
    }
    fetchNote = id => {
        axios
        .get(`http://localhost:3100/notes/${id}`)
        .then(response => {
            console.log(response);
            this.setState(() => ({ 
                note : response.data[0],
             }))
        })
        .catch(err => {
            console.error('Trouble fetching data',err)
        })
    }
    

   
  
    render(){
      
        return(
            
            <div className = 'expanded-note-container'>
                <div className = 'expanded-note-edit-container'>
                    <Link className ='edit-link'exact to ='/edit'>EDIT</Link>
                    <div className = 'delete-link' >DELETE</div>
                </div>
                <div className = 'expanded-note-sub-container'>
                    <div className = 'expanded-note-sub-sub-container'>    
                        <h2 className = 'expanded-title-header'>{this.state.note.title}</h2>
                        <div className = 'expanded-content'>{this.state.note.content}</div>
                    </div>    
                </div>
            </div>
        )
    }
}

export default ExpandedNote;