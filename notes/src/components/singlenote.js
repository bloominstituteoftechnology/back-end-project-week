import React, { Component } from 'react';

import axios from 'axios';

class Singlenote extends Component {
    
    state ={
        note: []
    }
    

    render() {
        
        return (
            <div className="onenote">
              <ul> 
              {this.state.note.map(note => {
                     return(
                    <li 
                    key={note.id}>
                   <h1>  {note.title}</h1>
                    <p>{note.content}</p>
                    </li>
                     )
                    })}


             </ul>
                </div>


        )
    }

    componentDidMount() {
        const id = this.state.note.id
        axios
        .get(`http://localhost:5000/notes/${id}`)
        .then(res => {
            this.setState({note: res.data})
            console.log(res.data)
        })
        .catch(err => {
            console.log('Axios failed')
        })
      console.log('state', this.state)
    }

    

  
}

export default Singlenote;