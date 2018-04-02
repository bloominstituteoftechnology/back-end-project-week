import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { 
  createStore, 
  applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';
// import {
//   BrowserRouter as Router,
//   Route,
// } from 'react-router-dom';
import { rootReducer } from './reducers';
import './index.css';

const createStoreWithMiddleware = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>,
  document.getElementById('root')
);
