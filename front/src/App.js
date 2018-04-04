import React, { Component } from 'react';
import { Route } from "react-router-dom";
import axios from "axios";

import Menu from "./components/menu/menu";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      notes: []
    }
  }

  componentWillMount = () => {
    axios.get("http://localhost:3001/")
      .then(response => {
        console.log(`Reponse: ${response.data}`)
        this.setState({notes: response.data})
      })
      .catch(err => {
        console.log(`There was an error: \n ${err}`);
      })
  }

  render() {
    console.log(this.state.notes);
    return (
      <div className="App">
        <h1>{this.state.notes.message}</h1>
      </div>
    );
  }
}

export default App;
