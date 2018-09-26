import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';


const NoteListItemContainer = styled.div`
  width: 50vw;
  height: 10vh;
  margin: auto 0;
  display: flex;
  flex-flow: column;
  background-color: #342D33;
  color: #E3FFD5;
  border: solid 1px #E3FFD5;
`;

const NoteListItem = (props) => {
  console.log('props in notelistitem',props);
  
    return (
      <NoteListItemContainer className="note-list-item">
      <h1></h1>
        {/* 
          - Title,
          - date created,
          - Buttons/Icons: {
            --- "delete"
          }
         */}
         <div>{props.note.title}</div>
        <div>{props.note.date}</div>
         
      </NoteListItemContainer>
    );
}

export default NoteListItem;
