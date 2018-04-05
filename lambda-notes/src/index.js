import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { 
  createStore, 
  applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import {
//   HashRouter as Router
// } from 'react-router-dom';
import { rootReducer } from './reducers';
import './index.css';

const createStoreWithMiddleware = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>,
  document.getElementById('root')
);
