import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Note from './Note';


const Container = styled.div`
    width: 650px;
    padding-top: 50px;
`;

const NotesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;


class Notes extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        const reqOptions = {
            headers: {
                Authorization: token
            }
        };

        axios
            .get('http://localhost:8000/notes', reqOptions)
            .then(res => {
                console.log(res);
                this.setState({ notes: res.data})
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return (
            <Container>
                <h3>Your Notes:</h3>
                <NotesContainer>
                    {this.state.notes.map(note => (
                        <Note note={note} key={note.id} />
                    ))}
                </NotesContainer>
            </Container>
        )
    }
}

export default Notes;