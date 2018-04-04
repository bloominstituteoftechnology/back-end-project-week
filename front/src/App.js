import React, { Component } from 'react';
import { Route } from "react-router-dom";
import axios from "axios";

import Menu from "./components/menu/menu";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  componentWillMount = () => {
    const self = this;
    axios.get("http://localhost:3001/api/allNotes")
      .then(response => {
        self.setState({notes: response.data});
      })
  }

  render() {
    console.log(this.state.notes);
    return (
      <div className="App">
        <Menu notes={this.state.notes} />
      </div>
    );
  }
}

export default App;
