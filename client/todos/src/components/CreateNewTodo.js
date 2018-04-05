import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
// import './CreateNewTodo.css';
import { NavLink, Link } from 'react-router-dom';

export default class CreateNewTodo extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: ""
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
  };

  handleTitle(e) {
    this.setState({title: e.target.value});
  }

  handleContent(e) {
    this.setState({content: e.target.value});
  }

  submitTodo(e) {
    e.prevent.default();
    this.setState({title: e.target.value});
    const { title, content } = this.state;
    const newTodo = { title, content, author: localStorage.getItem('uuID') };
    this.setState( {title:'', content: ''} );
    axios.post('http://localhost:3030/newtodo', newTodo)
    .then(shinynewtodo => {
      const newTodoId = shinynewtodo.data._id;
      window.location = `/todos/${newTodoId}`;
    })
    .catch(err => {
      console.log(err);
    })
  };

  render() {
    return (
      <form className="Login-form">
        <FormGroup className="Login-group" controlId="titleForm">
          Blog Title
          <FormControl 
            id="titleForm" 
            onChange={this.handleTitle} 
            placeholder="Blog Title" 
            type="text" 
            value={this.state.title}
          />
        </FormGroup>
        <FormGroup className="Login-group" controlId="contentForm">
          Blog Content
          <textarea 
            className="form-control"
            id="contentForm" 
            onChange={this.handleContent} 
            placeholder="Blog Content" 
            type="text" 
            value={this.state.content}
          ></textarea>
        </FormGroup>
        <button className="btn btn-sm btn-success SubmitButton" type="submit" onClick={this.submitPost}>Submit Blog Post</button>
      </form>
    );
  }
}

// function CreateNewTodo(props) {
//   // console.log("you called NewNote from NoteList");
//   return (
//     <div className="newNoteDiv">
//       <div className="leftBar">
//         <div>
//           <h1>Lambda</h1>
//           <h2>Notes</h2>
//           <NavLink to="/">
//             <button className="btns">View Your Notes</button>
//           </NavLink>

//           <NavLink to="/createnote">
//             <button className="btns">+Create New Note</button>
//           </NavLink>
//         </div>
//       </div>
//       <div className="rightBar">
//         <div>
//           <h3>Create New Note:</h3>
//         </div>
//         <form>
//           <input className="contentForm" value={'Insert Note Title here'} />
//         </form>
//         <div>
//           <form>
//             <input className="contentForm" value={'Insert Note Content here'} />
//           </form>
//         </div>
//         <div>
//           <NavLink to="/">
//             <button className="btns">Save</button>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateNewTodo;
