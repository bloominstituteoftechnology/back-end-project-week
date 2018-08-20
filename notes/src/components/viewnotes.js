import React, { Component } from 'react';

import axios from 'axios';

class Notes extends Component {
    state={
        notes:[]
    }

    render() {
        return (
            <div className="Notes">
            <ul> 
                 {this.state.notes.map(note => {
                    <li 
                    key={note.id}>
                    {note.title}
                    {note.content}
                    </li>
                    })}

             </ul>

            </div>
        )
    }


    componentDidMount() {
        axios
        .get('http://localhost:5000/notes')
        .then(res => {
            this.setState({ notes: res.data})
        })
        .catch(err => {
            console.log('Axios failed')
        })

        console.log('state', this.state)
    }
}

export default Notes;