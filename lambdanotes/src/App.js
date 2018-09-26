import React, { Component } from 'react';
import { Route, NavLink, withRouter } from "react-router-dom";
import axios from 'axios';

import './App.css';

import ListView from './components/ListView/ListView';
import NewNote from './components/NewNote/NewNote';
import NoteView from './components/NoteView/NoteView';
import EditNote from './components/EditNote/EditNote';

class App extends Component {
	constructor() {
		super();
		this.state = {
			notes: [],
			title:'',
			textBody: '',
		}
	}

	componentDidMount() {
		const endpoint = 'http://localhost:9000/api/notes';
		axios
		.get(endpoint)
		.then(response => {
			this.setState(() => ({ notes: response.data }));
		})
		.catch(error => {
			console.error('Server Error', error);
		});
	}

	deleteNote = id => {
		const endpoint = `http://localhost:9000/api/notes/${id}`;
		axios
			.delete(endpoint)
			.then(res => {
				console.log(res);
				this.redirect();
			})
			.catch(error => {
				console.error('Server error', error)
			});
	}

	editNote = (event, noteID ,title, textBody) => {
		event.preventDefault();
		 const editedNote = { title, textBody };
		 axios
		  .put(`http://localhost:9000/api/notes/${noteID}`, editedNote)
		  .then(res => {
			const editedNote = res.data;
			const notes = this.state.notes.slice();
			for (let i = 0; i < notes.length; i++) {
			  if (notes[i].id === editedNote.id) {
				notes[i] = editedNote;
			  }
			}
			this.setState({ notes });
			this.redirect();
		  })
			.catch(err => console.error(err));
			this.props.history.push('/edit/:id');
	  };

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	redirect = event => {
		this.props.history.push('/');
	}
    
	render() {
		return (
        <div className="App">
          <div className="sidemenu-container">
            <ul className="nav-bar">
              <div className="nav-container">
                <h1 className="menu-title">Lambda<br/>Notes</h1>
                <li><NavLink exact to="/" className="nav-text" activeClassName="active-component">View Your Notes</NavLink></li>
                <li><NavLink to="/create-new-note/" className="nav-text" activeClassName="active-component">+ Create New Note</NavLink></li>
              </div>     
            </ul>
          </div>

				<Route exact path="/" render={ (props) => <ListView {...props} notes={this.state.notes} />}/>
				<Route exact path="/create-new-note/" component={ NewNote } />
				<Route exact path="/note-view/:id" render={ props => <NoteView {...props} notes={this.state.notes} handleInputChange={this.handleInputChange} deleteNote={this.deleteNote}/>}/>
				<Route exact path="/note-view/edit/:id" render={ props => <EditNote {...props} notes={this.state.notes} editNote={this.editNote} redirect={this.redirect} />} />
			</div>
		);
	}
}

export default withRouter(App);
