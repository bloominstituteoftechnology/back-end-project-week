import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }
  // Test server connection
  componentDidMount() {
    axios
      .get('/api')
      .then(response => {
        this.setState({ response: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.response}</h1>
        </header>
      </div>
    );
  }
}

export default App;
