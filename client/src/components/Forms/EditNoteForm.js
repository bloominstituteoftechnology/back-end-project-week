import React from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';

const EditNoteContainer = styled.div`
    position:fixed;
    top:1%;
    margin:2% auto;
    width:400px;
    display:flex;
    flex-flow:column;
    align-items:center;
    justify-content:space-around;
    z-index:1000;
`;

const Input = styled.div`
    width:100%;
`;

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      id: null,
    }
    console.log('edit form', props);
  }

  componentDidMount() {
    let thisNote = this.props.notes.find((note) => {
      return note.id === parseInt(this.props.match.params.id);
    });

    this.setState({
      title: thisNote.title,
      content: thisNote.content,
      id: thisNote.id,
    })
  }

  saveNote = () => {
    this.props.handleEditNote(this.state)
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <EditNoteContainer >
        <input className="note-input title" type="text" name="title" placeholder="title" onChange={this.handleInput} value={this.state.title} />
        <textarea className="note-input note-area" rows="6" cols="33" name="content" placeholder="content" onChange={this.handleInput} value={this.state.content}></textarea>
        <button onClick={this.saveNote}>
          <Link to={`/noteview/${this.state.id}`}>save.</Link>
        </button>
        <button>
          <Link to={`/noteview/${this.state.id}`}>cancel.</Link>
        </button>
      </EditNoteContainer>
    )
  }
}

export default EditNote;