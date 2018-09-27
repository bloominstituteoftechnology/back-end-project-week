import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
const URL = `http://localhost:8888/notes`;


const NoteContainer = styled.div`
  width:420px;
  height:605px;
  margin:0 auto;
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
      content: '',
      id:null,
    }
  }

  componentDidMount() {
   this.initNoteOnUpdate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.initNoteOnUpdate(this.props);
  }

  initNoteOnUpdate = (datumus) => {
    console.log('datmus in note.js', datumus);
    
    let currNote = datumus.notes.find((note) => {
      return note.id === parseInt(datumus.match.params.id);
    });

    this.setState({
      title: currNote.title,
      content: currNote.content,
      id: currNote.id
    })
  }

  componentDidUpdate() {
    axios
      .get(URL)
      .then(res => {
        this.initNoteOnUpdate(res.data);
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });

  }

  handleEdit = () => {
    axios
      .put(URL + `/${this.state.id}`, { id: this.state.id, title: this.state.title, content: this.state.content })
      .then(res => {
        console.log('res from PUT', res.data);
        this.initNoteOnUpdate(res.data);
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      })
    this.props.edit(this.state);
  }

  handleDelete = () => {
    axios
      .delete(URL + `/${this.state.id}`)
      .then(res => {
        // this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
    this.props.delete(this.state.id);
  }

  render() {
    return (
      <NoteContainer>
        <div className="v">
          <Link to="/notelist">note list.</Link>
          <Link to={`/editnote/${this.state.id}`}> <div className="edit" onClick={this.handleEdit}>edit.</div></Link>
          <Link to="/notelist"> <div className="delete" onClick={this.handleDelete}>delete.</div></Link>
        </div>

        <h3>{this.state.title}</h3>
        <p>{this.state.content}</p>
      </NoteContainer>
    )
  }

}

export default Note;
