import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root/Root';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, logger)
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
