import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateNewTodo from './components/CreateNewTodo';
// import * as Todos from '../src/components'; //todos is the components folder...cos our components here are todos
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }

  componentWillMount() {
    if (localStorage.getItem('uuID')) {
      this.setState({ loggedIn: true });
    }
  }

  doLogout() {
    localStorage.setItem('uuID', '');
    window.location = '/';
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Router>
        <div>
          {/* <Route path = '/todos' component={Todos.GetTodos} exact></Route> */}
          <Route path = '/newtodo' component={CreateNewTodo} exact></Route>
          {/* <Route path = '/todos/:id' component={Todos.UpdateTodo} exact></Route>
          <Route path = '/todos//delete/:id' component={Todos.DeleteTodo} exact></Route>
          <Route path = '/newuser' component={Todos.CreateNewUser} exact></Route>
          <Route path = '/login' component={Todos.Login} exact></Route> */}
        </div>
      </Router>
    );
  }
}

export default App;
