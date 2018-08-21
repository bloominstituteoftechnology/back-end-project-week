import React, { Component } from 'react';

import axios from 'axios';
import {Route, Link} from 'react-router-dom';

class Singlenote extends Component {
    state={
        note:[],
        
    }

    render() {
        return (
            <div className="Note-wrapper">
                
            <ul> 
                 {this.state.note.map(note => {
                     return(
                    <li 
                    key={note.id}>
                   <h1>  {note.title}</h1>
                    <p>{note.content}</p>
                    <Link to='/'> View All Notes</Link>
                   
                    <form onSubmit={this.deleteHandler} >
                    
                      <button type='submit'>
                        Delete note
                        
                        </button>
                        
                    </form>
                    
                    </li>
                     )
                    })}

             </ul>

            </div>
                
        )
    }


    componentDidMount() {
      const id = this.props.match.params.id;
        axios
        .get(`http://localhost:5000/notes/${id}`)
        .then(res => {
            this.setState({ note: res.data})
            console.log(res.data)
        })
        .catch(err => {
            console.log('Axios failed')
        })

        console.log('state', this.state)
    }

    deleteHandler = event => {
      const id = this.props.match.params.id;
      event.preventDefault();

      axios
      .delete(`http://localhost:5000/notes/${id}`)
      .then(res => {
        window.location = '/'
      })
      console.log('deleted')
    }
}

export default Singlenote;