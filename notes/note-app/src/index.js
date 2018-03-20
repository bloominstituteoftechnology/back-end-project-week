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

import Root from './Root';
import Home from './components/Home/Home';
import Notes from './components/notes/notes';
import signup from './components/login/signup';
import login from './components/login/login';

import Gatekeeper from './components/gatekeeper/gatekeeper';

import App from './app';

import './styles/css/index.css';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route path="/notes" component={Gatekeeper(Notes)} />
          {/* <Route path="/notes/:username" component={App} /> */}
          <Route path="/signup" component={signup} />
          {/* <Route path="/login/:username" component={login} /> */}
          <Route path="/login" component={login} />
          {/* <Route path="/home" component={Home} /> */}
          {/* <Route exact path="/" component={Root} /> */}
          <Route exact path="/" component={App} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
