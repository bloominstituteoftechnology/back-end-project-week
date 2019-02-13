import React from 'react';
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

    fetchNote = id =>{
        axios   
            .get(`http://localhost:3100/notes/${id}`)
                .then(response =>{
                    console.log(response);
                    this.setState(() =>({
                        note: response.data
                    }))
                })
                .catch(() =>{
                    console.log('Could not fetch notes')
                })
    }
  
    render(){
        return(
            <div className = 'expanded-note-container'>
                <h3>{this.state.note.title}</h3>
            </div>
        )
    }
}

export default ExpandedNote;