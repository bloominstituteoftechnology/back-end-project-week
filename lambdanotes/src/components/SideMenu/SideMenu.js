import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";
import axios from 'axios';

import './SideMenu.css';

import ListView from '../ListView/ListView';
import NewNote from '../NewNote/NewNote';
import NoteView from '../NoteView/NoteView';
import EditNote from '../EditNote/EditNote';

class SideMenu extends Component {
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

	// addNote = event => {
	// 	event.preventDefault();

	// 	axios
	// 	.post('http://localhost:9000/api/notes', this.state)
	// 	.then(res => {
	// 		console.log('Axios response', res);
	// 		this.props.history.push('/notes');
	// 	})
	// 	.catch(error => {
	// 		console.error('Axios response:', error)
	// 	});
	// }

	deleteNote = note => {
		let notes = this.state.notes.slice();
		for (let i = 0; i < notes.length; i++) {
			if (notes[i].id === note.id) {
					notes.splice(i, 1);
			}
		}
		this.setState({ notes })
	}

	editNote = note => {
		//copia del estado utilizando el método slice() y pasando el parametro note
		let notes = this.state.notes.slice();
		// iteramos con i el array/lista de objectos guardados/store en el objeto notes
		for(let i = 0; i < notes.length; i++) {
			if (notes[i].id === note.id) {
					notes[i] = note
			}
		}
		this.setState({ notes })
	}

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}
    
	render() {
		return (
			<div className="sidemenu-container">
				<ul className="nav-bar">
					<div className="nav-container">
						<h1 className="menu-title">Lambda<br/>Notes</h1>
						<li><NavLink exact to="/" className="nav-text" activeClassName="active-component">View Your Notes</NavLink></li>
						<li><NavLink to="/create-new-note/" className="nav-text" activeClassName="active-component">+ Create New Note</NavLink></li>
					</div>     
				</ul>

				<Route exact path="/" render={(props) => <ListView {...props} notes={this.state.notes} />}/>
				<Route exact path="/create-new-note/" component={ NewNote } />
				<Route exact path="/note-view/:id" render={(props) => <NoteView {...props} notes={this.state.notes} deleteNote={this.deleteNote} handleInputChange={this.handleInputChange}/>}/>
				<Route exact path="/note-view/:id/edit" render={(props) => <EditNote {...props} notes={this.state.notes} editNote={this.editNote} handleInputChange={this.handleInputChange}/>}/>
			</div>
		);
	}
}

export default SideMenu;