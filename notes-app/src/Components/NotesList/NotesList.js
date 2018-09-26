import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';



class NotesList extends Component {

    
    state = {
        update: false
    }
    
    render(){
        
        return (
            <div>
                <div className="inner_outer_notes">
                
                <h3 className="list_title">Your Notes:</h3>
                <div className="note_container">
                {this.props.state.notes.map(each => (


                    <Link to={`/note/${each.id}`} style={{ textDecoration: 'none' }}>
                        <div 
                            className="note" 
                            key={each.id}
                            allnotes={this.state}    
                        >
                        <div className="note_title" >
                            {each.title}
                                <br /><br />
                        </div>
                            {each.content}
                        </div>
                    </Link>
                    
                ))}
                </div>
                </div>
            </div>
        )
    }

}

export default NotesList;
