import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Note from './Note.js';


const NoteListContainer = styled.div`
    width:405px;
    display:flex;
    flex-flow:column;
    justify-content: space-around;
`;

const NoteList = (props) => {
    console.log(props);
    
    return (
        <NoteListContainer>
            {
                props.notes.map((note)=>{
                    return <Link style={{ textDecoration: 'none', color: '#FF0CBC', margin: '2px 0'}} to={`/noteView/${note.id}`}>
                     <Note key={note.id} note={note} />
                    </Link>
                    
                })
            }
        </NoteListContainer>
    )
};

export default NoteList;