import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
const URL = `http://localhost:9000/notes`;


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
  font-family:sans-serif;
  font-size:2rem;
  text-decoration:none;

`;

const NoteMenu = styled.div`
  width:100%;
  display:flex;
  flex-flow:row;
  justify-content:space-around;
`;

const LinkStyles = {
  textDecoration:'none',
  color:'#E3FFD5'
}

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
    console.log(this.props);
    
    // let currNote = this.props.notes.filter((note) => note.id === this.props.match.params.id );
    for(let i=0; i<this.props.notes.length; i++){
      if (this.props.notes[i].id == this.props.match.params.id){

        this.setState({
          title:this.props.notes[i].title,
          content: this.props.notes[i].content,
          id: this.props.notes[i].id,
        })
      }
    }
    // console.log(currNote);

    // this.setState({
    //   title: currNote.title,
    //   content: currNote.content,
    //   id: currNote.id
    // });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.props = nextProps;
  //   // this.initNoteOnUpdate(this.props);
  // }

  // initNoteOnUpdate = (datumus) => {
  //   console.log('datumus is ',datumus);

  //   let currNote = datumus.find((note) => {
  //     return note.id === this.props.match.params.id;
  //     // return note.id === parseInt(datumus.match.params.id);
  //   });

  //   this.setState({
  //     title: currNote.title,
  //     content: currNote.content,
  //     id: currNote.id
  //   })
  // }

  // componentDidUpdate() {
  //   axios
  //     .get(URL)
  //     .then(res => {
  //       this.initNoteOnUpdate(res.data);
  //     })
  //     .catch(err => {
  //       console.log(`ERROR: ${err}`);
  //     });
  // }

  handleEdit = () => {
    // axios
    //   .put(URL + `/${this.state.id}`, { id: this.state.id, title: this.state.title, content: this.state.content })
    //   .then(res => {
    //     console.log('res from PUT', res.data);
    //     this.initNoteOnUpdate(res.data);
    //   })
    //   .catch(err => {
    //     console.log(`ERROR: ${err}`);
    //   })
    this.props.edit(this.state);
  }

  handleDelete = () => {
    // axios
    //   .delete(URL + `/${this.state.id}`)
    //   .then(res => {
    //     // this.setState({ notes: res.data });
    //   })
    //   .catch(err => {
    //     console.log(`ERROR: ${err}`);
    //   });
    this.props.delete(this.state.id);
  }

  render() {
    return (
      <NoteContainer>
        <NoteMenu>
          <Link to="/notelist" style={LinkStyles} >view notes.</Link>
          <Link to={`/editnote/${this.state.id}`} style={LinkStyles} > <div className="edit" onClick={this.handleEdit} style={LinkStyles} >edit.</div></Link>
          <Link to="/notelist" style={LinkStyles} > <div className="delete" onClick={this.handleDelete} >delete.</div></Link>
        </NoteMenu>

        <h3>{this.state.title}</h3>
        <p>{this.state.content}</p>
      </NoteContainer>
    )
  }

}

export default Note;
