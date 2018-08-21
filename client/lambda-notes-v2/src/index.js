import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import notesReducer from './reducers/notesReducer';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

import './index.css';


const store = createStore(
    notesReducer,
    applyMiddleware(thunk)
);


render(

    <Root store={store} />,

document.getElementById('root'));
registerServiceWorker();
 