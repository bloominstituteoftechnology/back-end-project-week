import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import NoteList from "./components/NoteList";
import ViewNote from "./components/ViewNote";
import Edit from "./components/Edit";
import Create from "./components/Create";
import './App.css';
import axios from 'axios'; 
import Delete from './components/Delete';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      notes: []
    }

  }

  update = () => {
    axios.get('https://boiling-wildwood-28100.herokuapp.com/notes')
    .then(response => {
      return this.setState({ notes: response.data })})
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.update();
  }
  


  render() {
    return (
      <div className="App">
        <div className="container0">
          <Navbar />
          <Route  exact path="/" render={() => <NoteList notes={this.state.notes} />} />
          <Route path="/create" render={props => <Create {...props}  update={this.update}/>} />
          <Route path="/view/:id" render={props => <ViewNote {...props} notes={this.state.notes} />} />
          <Route path="/edit/:id" render={props => <Edit {...props} notes={this.state.notes} update={this.update}/>} />
          <Route path="/delete/:id" render={props => <Delete {...props} notes={this.state.notes} update={this.update}/>} />
        </div>
      </div>
    );
  }
}

export default App;
