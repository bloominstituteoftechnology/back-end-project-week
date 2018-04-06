import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Note from './components/Note/Note';
import EditNote from './components/EditNote/EditNote';
import CreateNewNote from './components/CreateNewNote/CreateNewNote';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers';

import ReduxThunk from 'redux-thunk';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import SignOut from './components/SignOut/SignOut';
import RequireAuth from './components/HOC/RequireAuth';
import HomePage from './components/HomePage/HomePage';
import NotLoggedIn from './components/NotLoggedIn/NotLoggedIn';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const store = createStoreWithMiddleware(rootReducers);

ReactDOM.render(
<Provider store={store}>
  <Router>
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/pleaselogin" component={NotLoggedIn} exact />
      <Route path="/notes" component={RequireAuth(App)} exact />
      <Route path="/loggedout" component={SignOut} exact />
      <Route path="/login" component={SignIn} exact />
      <Route path="/users" component={SignUp} exact />
      <Route path="/create" component={CreateNewNote} exact />
      <Route path="/view/:id" component={Note} exact />
      <Route path="/edit/:id" component={EditNote} exact />
    </Switch>
  </Router>
</Provider>
, document.getElementById('root'));