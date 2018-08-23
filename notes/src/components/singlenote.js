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

                    <div className='editor'>
                 
             <div className="Addnote">
                <h1> Add a Note!</h1>
                <form onSubmit={this.editHandler}>

                <div className='title'>
                    <label htmlFor='title'/>
                    <input
                    name='title'
                    value={this.state.note.title}
                    onChange={this.inputChangeHandler}
                    type='text' />
                </div>

                <div className='content'>
                    <label htmlFor='content'/>
                    <input
                    name='content'
                    value={this.state.note.content}
                    onChange={this.inputChangeHandler}
                    type='text' />
                </div>

                <div className='editbuton'>
                <button type="submit">
                     Edit note
                </button>
                </div>

                </form>
                
                </div>               
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
      console.log( 'state',this.state);
      console.log('state.note', this.state.note);
      const {name, value} = event.target 
      this.setState({[name]: value})
  };

    editHandler = event => {
      
      const id = this.props.match.params.id;
    
      event.preventDefault();
      axios
      .put(`http://localhost:5000/notes/${id}`, this.state)
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