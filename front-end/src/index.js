import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { notesReducer } from './reducers';
import Root from './components/Root';
import './index.css';

// Create store pass it reducer and middleware
// wrap <App /> in provider tags

let store = createStore(notesReducer, applyMiddleware(thunk, logger));

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

//testing git setup
