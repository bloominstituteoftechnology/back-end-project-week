import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';

import Buttons from './components/Button';
import Register from './components/Register'
import Login from './components/Login';
import TodoList from './components/TodoList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Route exact path='/' component={Buttons} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/todos' component={TodoList}></Route>
      </div>
    );
  }
}

export default App;
