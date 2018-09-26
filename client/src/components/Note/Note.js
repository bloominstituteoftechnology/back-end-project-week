import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';


const NoteContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto 0;
  display: flex;
  flex-flow: column;
  align-items:center;
  background-color: #342D33;
  color: #E3FFD5;
`;

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      note: '',
      id: null,
      date:0
    }
    console.log('props in Note',props);
    
  }

  componentDidMount() {
    let currNote = this.props.notes.find((note) => {
      return note.id === parseInt(this.props.match.params.id);
    });

    this.setState({
      title: currNote.title,
      note: currNote.content,
    })
  }

  handleEdit = () => {
    this.props.edit(this.state.id);
  }

  handleDelete = () => {
    this.props.delete(this.state.id);
  }

  render() {
    return (
      <NoteContainer>
        <div className="v">
          <Link to="/notelist">note list.</Link>
          <Link to={`/editnote/${this.state.id}`}> <div className="edit" onClick={this.handleEdit}>edit.</div></Link>
          <Link to="/"> <div className="delete" onClick={this.handleDelete}>delete.</div></Link>
        </div>

        <h3>TITLE: {this.state.title}</h3>
        <p>{this.state.note}</p>
      </NoteContainer>
    )
  }

}

export default Note;
