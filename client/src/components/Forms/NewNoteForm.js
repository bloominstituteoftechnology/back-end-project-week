import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar/NavBar.js';
import styled from 'styled-components';
const URL = `http://localhost:9000/notes`;


const FormContainer = styled.div`
   width:420px;
  height:605px;
  margin: auto 0;
  display: flex;
  flex-flow: column;
  background-color: #342D33;
  color: #E3FFD5;
`;

class NewNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      content: '',
    }
  }

  componentDidMount() {

  }

  saveNote = () => {
    axios
      .post(URL, this.state)
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
      this.props.handleNewNote(this.state);
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <FormContainer>
      {/* <NavBar/> */}
      <form className="App">
          <input className="note-input title" type="text" name="title" placeholder="title" onChange={this.handleInput} />
          <textarea className="note-input note-area" rows="6" cols="33" name="content" placeholder="note" onChange={this.handleInput}></textarea>
          <button onClick={this.saveNote}>
            <Link to="/notelist">save.</Link>
          </button>
          <button>
            <Link to="/menu">cancel.</Link>
          </button>
      </form>
      </FormContainer>
    );
  }
}

export default NewNoteForm;
