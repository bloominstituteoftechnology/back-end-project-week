import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import NoteListItem from './NoteListItem';
import NavBar from '../NavBar/NavBar.js';
import Tack from '../../tack.svg';
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

const imgStyle = {
  width: '50%',
  margin: '5% 25%',
};

const NoteItemStyle = {
  width:'100%',
  height:'10vh',
  lineHeight:'1',
  fontSize:'1.4rem',
  textDecoration: 'none'
  // paddingTop:'0px',
  // marginTop:'0px'
}

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
        <div><img src={Tack} style={imgStyle} /></div>
         {
           this.state.notes.map((note)=>{
            return <Link to={`/noteview/${note.id}`} style={{textDecoration:'none'}}><NoteListItem style={NoteItemStyle} note={note}/></Link>
           })
         }
      </NoteListContainer>
      
    );
  }
}

export default NoteList;
