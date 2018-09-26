import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu/Menu.js';
import Landing from './components/Landing.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){

  }

  handleCreateNote = () => {

  }

  handleLandingUpwardAnimation = () =>{

  }

  render() {
    return (
      <div className="App">
       {/* 
        - Landing Route (default)
        - Menu Route
        */} 
        <Route path="/landing" {...rest} render={(props) => { <Landing {...props} /> }} />
        <Link to="login">Menu</Link>
        <Route path="/menu"{...rest} render={(props) => { <Menu {...props} /> }} />
      </div>
    );
  }
}

export default App;
