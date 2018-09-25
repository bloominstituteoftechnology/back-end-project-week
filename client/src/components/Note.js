import React from 'react';
import styled from 'styled-components';

const NoteContainer = styled.div`
    width:400px;
    height:150px;
    padding: 0 2%;
    background:#995693;
    margin: 2px 0;
`;


const Note = (props) => {

    return <NoteContainer>
        <h1>{props.note.title}</h1>
        <div>{props.note.note}</div>
    </NoteContainer>
}

export default Note;