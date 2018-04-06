import React, { Component } from 'react';
import { Route } from "react-router-dom";
import axios from "axios";

import Menu from "./components/menu/menu";
import Home from "./components/home/home";
import NewNote from "./components/newNote/newNote";
import ViewNote from "./components/viewNote/viewNote";
import EditNote from "./components/editNote/editNote";
import Login from "./components/login/login";
import Register from "./components/register/register";


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      allNotes: []
    }
  }

  componentWillMount = () => {
    axios.get("http://localhost:3001/api/allNotes")
      .then(response => {
        this.setState({allNotes: response.data});
        console.log(`The state in App.js was added successfully`)
      })
      .catch(err => {
        console.log(`There was an error: \n ${err}`);
      })
  }

  render() {
    return (
      <div className="App" >
        <div className="App__menu">
          <Route path="/" component={Menu} />
        </div>

        <div className="App__main">
          <Route path="/" exact component={() => {
           return <Home allNotes={this.state.allNotes}/>
          }} />
          <Route path="/newnote" exact component={NewNote} />
          <Route path="/viewnote" exact component={ViewNote} />
          <Route path="/editnote" exact component={EditNote} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </div>
      </div>
    );
  }
}

export default App;
