import React from 'react';
import ReactDOM from 'react-dom';
//import components
import './index.css';
import App from './App';
//Router imports
import { BrowserRouter as Router } from 'react-router-dom';
//Redux imports
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import notesReducer from './reducers';

const store = createStore(notesReducer);


ReactDOM.render(
    (
        <Provider store = {store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )
, document.getElementById('root'));

