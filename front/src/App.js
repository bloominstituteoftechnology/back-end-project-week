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

  componentDidMount(){
    axios.get("http://localhost:3001")
    .then(response => {
      console.log(response);
      this.setState({example: response.data.title});
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <Menu notes={this.state.example} />
      </div>
    );
  }
}

export default App;
