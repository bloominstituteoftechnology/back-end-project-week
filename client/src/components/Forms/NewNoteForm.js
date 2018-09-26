import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.js';
import styled from 'styled-components';


const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
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
      content: ''
    }
  }

  componentDidMount() {

  }

  handleSubmit = () => {

  }

  render() {
    return (
      <FormContainer>
      {/* <NavBar/> */}
      <form className="App">
        <input type="text" placeholder="Title" name="title"/>
        <input type="text" placeholder="Content" name="content"/>
        <button>Create</button>
        <button>Discard</button> 
      </form>
      </FormContainer>
    );
  }
}

export default NewNoteForm;
