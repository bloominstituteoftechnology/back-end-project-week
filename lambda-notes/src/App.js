// React Imports
import React, { Component } from 'react';
import './index.css';
//Component Imports
import LeftNav from './components/LeftNav/LeftNav';
import MainContent from './components/MainContent/MainContent';


class App extends Component {
  render() {
    return (
      <div className ='app_container'>
        <LeftNav /> 
        <MainContent />
      </div>
    ); 
  }
}

export default App;
