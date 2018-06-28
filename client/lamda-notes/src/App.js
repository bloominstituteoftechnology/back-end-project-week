import React, { Component } from 'react';
import './index.css';
import LeftNav from './components/leftNav';
import MainContent from './components/mainContent';


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

// componentDidMount() {
//   const api = process.env
// }
export default App;