import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './ExpandedNote.css'


class ExpandedNote extends React.Component{
    constructor(){
        super()
        this.state = {
            note: [],
            openDelete : false,
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        this.fetchNote(id);
    }
    fetchNote = id => {
        axios
        .get(`https://chillington-notes-app.herokuapp.com/${id}`)
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
    openDelete = () =>{
        if(!this.state.openDelete){
            this.setState({
                openDelete: true
            })
        }
    }

    closeDelete = () =>{
        if(this.state.openDelete){
            this.setState({
                openDelete: false
            })
        }    
    }
    

   
  
    render(){
      
        return(
           
            <div className = 'expanded-note-container'>
                <div className = {(this.state.openDelete) ? 'expanded-delete' : 'closed-delete'}>
                    <div className = 'delete-prompt-window'>
                        <h3 className = 'delete-question'>Delete note?</h3>
                        <div className = 'delete-button-container'>
                            <div className = 'yes-button' onClick = {() => {this.props.deleteNote(this.state.note.id); this.props.history.push('/')}}>YES</div>
                            <div className = 'no-button' onClick = {this.closeDelete}>NO</div>
                        </div>

                    </div>
                </div>
                <div className = 'expanded-note-edit-container'>
                    <Link className ='edit-link'exact to ={`/edit/${this.state.note.id}`}>EDIT</Link>
                    <div className = 'delete-link' onClick = {this.openDelete}>DELETE</div>
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