import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';


const NoteListItemContainer = styled.div`
  width:400px;
  height:10vh;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  align-items:center;
  justify-content:center;
  background-color: #342D33;
  color: #E3FFD5;
  font-size:1.5rem;
  border-top: solid 1px #E3FFD5;
  font-family:sans-serif;
`;

const NoteListItem = (props) => {
  
    return (
      <NoteListItemContainer className="note-list-item">
        <div>{props.note.title}</div>
        <div>{props.note.date}</div>
      </NoteListItemContainer>
    );
}

export default NoteListItem;
