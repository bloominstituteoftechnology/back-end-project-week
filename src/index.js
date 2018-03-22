// react
import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// react-router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import rootReducer from './reducers';

import Signup from './components/login/signup';
import Login from './components/login/login';

import Gatekeeper from './components/gatekeeper/gatekeeper';

import App from './app';

import './styles/css/index.css';

// const store = createStore(rootReducer, applyMiddleware());
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Gatekeeper(App)} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
