import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
// import notesReducer from './reducers/notesReducer';
// import rootReducer from './reducers'
import { fetchReducer }from'./reducers/index'
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { createLogger } from 'redux-logger';
import { render } from 'react-dom';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const logger = createLogger({
    collapsed: true
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    fetchReducer, composeEnhancers(
    applyMiddleware(thunk, logger),    
));


render(

    <Root store={store} />,

document.getElementById('root'));
registerServiceWorker();
 