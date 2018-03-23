import React from "react";
import ReactDOM from "react-dom";
// import "./css/index.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './App';
import Login from './components/auth/login';
import RequireAuth from './components/auth/require_auth'
import Signup from './components/auth/signup';
import Logout from './components/auth/logout';

import NoteForm from './components/noteForm';
import NoteList from './components/noteList';
import NoteMate from './components/notes/noteMain';
import Notes from './components/notes/notes';

import { AUTH_USER } from './actions/types';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store} >
    <Router>
      <Route path='/' component={App} exact>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
