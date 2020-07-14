import React, { Component } from 'react';
import axios from 'axios';
import Note from './Note'
import '../App.css';
import styled from 'styled-components';

const StyledDiv = styled.div`
width: 600px; 
height: 100px; 
border: 2px solid black;
padding-top: 25px; 
margin: 0 auto; 
margin-bottom: 10px;  
background: light; 
box-shadow: 3px 5px; 
font-weight: bolder; 
&:hover{
  background: white; 
  box-shadow: none; 
}`;

const Li = styled.div`
padding: 2px; 
font-size: 20px; 
`;

export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        notes: [],
    };
    }
    componentDidMount() {
        this.getNotes();
    }

    getNotes = () => {
        axios
            .get("http://localhost:2020/api/notes")
            .then(response => {
                console.log(response.data)
                this.setState({ notes: response.data });

            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {
        return (
            <div>
                {this.state.notes.map(note => {
                    return (
                        <StyledDiv>
                            <span key={note.id} className="note"></span>
                            <Li className="name">{note.title}</Li>
                            <Li className="name">{note.content}</Li>
                        </StyledDiv>
                    )
                })}
            </div>
        );
    }
}
