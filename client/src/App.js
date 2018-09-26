import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import Menu from './components/Menu/Menu.js';
import Landing from './components/Landing/Landing.js';

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
      {/* <Landing/> */}
        <Route exact path="/" component={Landing} />
        <Route path="/menu" component={Menu} />
      </div>
    );
  }
}

export default App;
