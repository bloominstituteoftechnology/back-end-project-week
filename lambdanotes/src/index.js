import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App'
import thunk from 'redux-logger';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import noteReducer from './reducers/index';

const store = createStore(noteReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
    </Provider>,
    document.getElementById('root')
  );