import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reducers from './reducers';
import SignUp from './components/signup';
import SignIn from './components/signin';
//import RequireAuth from './components/RequireAuth';
import SignOut from './components/signout';

const sotreWithMW = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={sotreWithMW(reducers)}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <Route path="/notes" /*{component={RequireAuth(Notes)}}*/ />
        <Route path="/signout" component={SignOut} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
