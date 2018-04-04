import React from 'react';
import NoteList from './mainpage/NoteList';
import NoteView from './mainpage/NoteView';
import EditNote from './mainpage/EditNote';
import CreateNote from './mainpage/CreateNote';
import SearchBar from './mainpage/SearchBar';
import WelcomePage from './mainpage/welcome/WelcomePage';
import CsvCreator from 'react-csv-creator';
import { arrayMove } from 'react-sortable-hoc';
import axios from 'axios';
import './mainpage.css';
import './deletebox.css';

class MainPage extends React.Component {
  state = {
    currentNote: {},
    notes: [],
    deleting: false,
    searchValue: '',
    notesLoaded: false,

  };

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  render() {
    console.log('rendering', this.state.notes);
    return (
      <div>
        <div style={this.state.deleting ? { visibility: 'visible' } : { visibility: 'hidden' } }>
          <div className="deleteBox__bigBox">
            <div className="bigBox__whiteBox">
              <div className="whiteBox__container">
                <div className="container__top">Are you sure you want to delete this?</div>
                <div className="container__bottom">
                  <button className="container__button-delete" onClick={() => this.deleteCurrentNote()}>Delete</button>
                  <button className="container__button-cancel" onClick={() => this.toggleDeleting()}>No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainPage__topRow" style={this.props.caseValue === 'noteView' ? { visibility: 'visible' } : { visibility: 'hidden' } }>
          <div className="topRow__button-box">
            <div className="topRow__button" onClick={() => this.props.changeSwitch('Edit Note:', 'editNote')}>edit</div>
            <div className="topRow__button" onClick={() => this.toggleDeleting()}>delete</div>
          </div>
        </div>
        <div className="mainPage__middleRow">
          <div className="mainPage__middleRow-title">{this.props.title}</div>
          <div style={this.props.caseValue === 'noteList' && this.state.notes.length > 1 ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <SearchBar sendSearchValue={this.updateSearchValue}/>
          </div>
          <CsvCreator
            filename='my_notes'
            headers={ [{ id: 'first', display: 'Titles' }, {id: 'second', display: 'Content' }] }
            rows={this.state.notes.filter(elem => elem.title.toLowerCase().includes(this.state.searchValue.toLowerCase()))
              .map(elem => {return { first: `${elem.title}`, second: `${elem.content}` };} )}
          >
            <button className="mainPage__middleRow-button" style={this.props.caseValue === 'noteList' ? { visibility: 'visible' } : { visibility: 'hidden' } }>Download CSV</button>
          </CsvCreator>
        </div>
        <div className="mainPage__bottomRow">
          {this.renderSwitch(this.props.caseValue)}
        </div>
      </div>
    );
  }

  renderSwitch = (param) => {
    switch(param) {
      case 'noteList':
        if (this.state.notes.length === 0 && !this.state.notesLoaded) this.getNotes();
        return <div className="mainPage__noteList">
          <NoteList notesArr={this.state.notes} changeSwitch={this.props.changeSwitch} viewNote={this.changeCurrentNote}
           filterValue={this.state.searchValue} onSortEnd={this.onSortEnd}
           distance={10} axis={'xy'}
          />
        </div>;
      case 'noteView':
        return <div className="mainPage__noteView">
          <NoteView currentNote={this.state.currentNote} />
        </div>;
      case 'editNote': 
        return <div className="mainPage__noteView">
          <EditNote currentNote={this.state.currentNote} submitModifiedNote={this.replaceCurrentNoteInArr} changeSwitch={this.props.changeSwitch} />
        </div>;
      case 'createNote':
        return <CreateNote addNote={this.addNote} />;
      default:
        return <WelcomePage changeUser={this.props.changeUser} />;
    }
  };

  addNote = (noteObj) => {
    axios
      .post(
        'http://localhost:3030/api/notes',
        noteObj,
        { headers: { "Authorization": this.props.currentUser.token }}
      )
      .then(res => {
        console.log(res.data);
        this.setState({ ...this.state, notes: this.state.notes.concat([noteObj]) });
      })
      .catch(err => {
        console.error(err);
      })
  };

  changeCurrentNote = (nextNote) => {
    this.setState({...this.state, currentNote: nextNote});
  };

  replaceCurrentNoteInArr = (newNote) => {
    axios
      .put(
        'http://localhost:3030/api/notes',
        newNote,
        { headers: { "Authorization": this.props.currentUser.token }}
      )
      .then(res => {
        console.log(res.data);
        if(!newNote._id) {
          newNote._id = res.data._id;
        }
        this.setState({...this.state, currentNote: newNote, notes: this.state.notes.map(note => { if (note.id === newNote.id) {return newNote} else {return note} } )
        });
      })
      .catch(err => {
        console.error(err);
        console.error(err.response);
      });
  }

  toggleDeleting = () => {
    this.setState({...this.state, deleting: !this.state.deleting});
  };

  deleteCurrentNote = () => {
    this.setState({ notes: this.state.notes.filter(note => note.id !== this.state.currentNote.id), currentNote: {}, deleting: false });
    this.props.changeSwitch('Your Notes:','noteList');
  };

  updateSearchValue = (str) => {
    this.setState({...this.state, searchValue: str})
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({ ...this.state,
      notes: arrayMove(this.state.notes, oldIndex, newIndex),
    });
  };

  reverseNoteOrder = () => {
    this.setState({ ...this.state, notes: [...this.state.notes].reverse() });
  }

  getNotes = () => {
    axios
      .get('http://localhost:3030/api/notes', { headers: { "Authorization": this.props.currentUser.token }})
      .then(foundNotes => {
        console.log('this is what we found', foundNotes);
        this.setState({ notes: foundNotes.data, notesLoaded: true });
      })
      .catch(err => {
        console.error(err);
      })
  }

  clearNotes = () => {
    if(this.state.notes.length > 0) {
      this.setState({ notes: [], notesLoaded: false });
    }
  }

}

export default MainPage;
