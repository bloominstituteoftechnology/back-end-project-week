import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.js';

class NewNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      content: ''
    }
  }

  componentDidMount() {

  }

  handleSubmit = () => {

  }

  render() {
    return (
      <div>
      <NavBar/>
      <form className="App">
        <input type="text" placeholder="Title" name="title"/>
        <input type="text" placeholder="Content" name="content"/>
        <button>Create</button>
        <button>Discard</button> 
      </form>
      </div>
    );
  }
}

export default NewNoteForm;
