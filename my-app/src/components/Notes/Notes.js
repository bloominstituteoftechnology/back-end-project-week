import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Delete from '../Delete/Delete';
import './Notes.css';


class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: [],
        }
    }


    componentDidMount() {
        axios
        .get(`http://localhost:3001/api/note/${this.state.id}`)
        .then(res => {
            console.log(res)
          this.setState ({ note: res.data.note });
          this.setState({ id: this.state.clickHandler()})
        })
        .catch(err => {
          console.log(err)
        })
    }

    render() {
        return (
            <div className="Note">

                <div className='Note-feature'> 
                    <h1> Lambda Notes </h1>

                    <button className ='Note-buttons'>
                        <Link to= '/'> View Your Notes </Link>
                    </button>
                    <button className ='Note-buttons'>
                        <Link to= '/newNote'> +Create New Note </Link>
                    </button>
                </div>
           
                <div className='Note-holder'>
                    <div className='Note-links'>
                        <Link to= '/edit'> edit </Link>
                        <Delete />
                    </div>

                    <div className='Note-text'>
                        <div className = 'Note-notes'> 
                            <h1> {this.state.note.title} </h1> <p> {this.state.note.body} </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notes;

// export const Notes = props => {
//     return(
//         <div className="Note">
//             <div className='Note-feature'> 
//                 <h1> Lambda Notes </h1>
//                 <button className ='Note-buttons'>
//                     <Link to= '/'> View Your Notes </Link>
//                 </button>
//                 <button className ='Note-buttons'>
//                     <Link to= '/newNote'> +Create New Note </Link>
//                 </button>
//             </div>
//             <div className='Note-holder'>
//                 <div className='Note-links'>
//                     <Link to= '/edit'> edit </Link>
//                     <Delete />
//                 </div>
//                 <div className='Note-body'>
//                     <h1> Note Name </h1>
//                     <div className='Note-text'>
//                         {props.note.map(note => {
//                         return [<div className = 'Note-notes'> 
//                         <Link to = '/noteView' >
//                         <h3>{note.title}</h3> <p>{ note.body }</p>
//                         </Link>
//                         </div>];
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }