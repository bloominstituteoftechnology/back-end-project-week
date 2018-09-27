import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import NoteListItem from './NoteListItem';
import NavBar from '../NavBar/NavBar.js';
const URL = `http://localhost:8888/notes`;

const NoteListContainer = styled.div`
  width:420px;
  height:605px;
  margin: auto 0;
  display: flex;
  flex-flow: column;
  align-items:center;
  background-color: #342D33;
  color: #E3FFD5;
`;

class NoteList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notes:[],
    }
  }

  componentDidMount() {
    // this.setState({notes:this.props.notes});
    console.log('props in notelist', this.props);
    
    axios
      .get(URL)
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props', nextProps);
    this.props = nextProps;
  }

  componentDidUpdate(){
    axios
      .get(URL)
      .then(res => {
        let _notes = res.data;
        this.setState({ notes: _notes });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
  }

  handleDeleteNote = (input) => {
    console.log('id of to be deleted', input);
    axios
      .delete(URL + `/${input}`)
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
  }

  render() {
    return (
    
      <NoteListContainer>
       
          <div>SOMEthing
            
          </div>
         {
           this.state.notes.map((note)=>{
            return <Link to={`/noteview/${note.id}`}><NoteListItem note={note}/></Link>
           })
         }
      </NoteListContainer>
      
    );
  }
}

export default NoteList;
