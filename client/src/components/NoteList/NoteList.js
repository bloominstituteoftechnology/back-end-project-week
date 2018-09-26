import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import NoteListItem from './NoteListItem';


const NoteListContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto 0;
  display: flex;
  flex-flow: column;
  align-items:center;
  background-color: #342D33;
  color: #E3FFD5;
`;

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes:[],
    }
  }

  componentDidMount() {
    this.setState({notes: this.props.notes});
  }


  render() {
    return (
      <NoteListContainer className="note-list">
      <h1>NOTE LIST</h1>
        {/* 
          - search bar (hidden on init),
          - list of NoteListItems,
          - BUTTONS: {
            --- "search",
            --- "add new",
            --- "info"
            --- "main menu"
          }
         */}
         
         {
           this.state.notes.map((note)=>{
            return <Link to={`/noteview/${note.id}`} ><NoteListItem note={note} /></Link>
           })
         }
      </NoteListContainer>
    );
  }
}

export default NoteList;
