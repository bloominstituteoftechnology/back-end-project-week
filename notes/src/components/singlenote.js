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
                   
                    <form onSubmit={this.deleteHandler}>
                    
                      <button type='submit'>
                        Delete note
                        
                        </button>
                        
                    </form>
                    <div className='editnote'>
              
              
             <p> Edit this note</p>
                <form onSubmit={this.editHandler}>

                <div className='title'>
                    <label htmlFor='title'/>
                    <input
                    name='title'
                    value={note.title}
                    onChange={this.inputChangeHandler}
                    type='text' />
                </div>

                <div className='content'>
                    <label htmlFor='content'/>
                    <input
                    name='content'
                    value={note.title}
                    onChange={this.inputChangeHandler}
                    type='text' />
                </div>

                <div className='editbuton'>
                <button type="submit">
                     Save changes
                </button>
                </div>

                </form>
 
               </div>
                    
                    
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

    inputChangeHandler = event => {
      const {name, value} = event.target 
      this.setState({[name]: value})
  };

    editHandler = event => {
      const id = this.props.match.params.id;
      
      event.preventDefault();

      axios
      .put(`http://localhost:5000/notes/${id}`, this.state.note)
      .then(res => {
        window.location.reload();
      })
      console.log('edited');

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