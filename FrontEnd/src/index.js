import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory as Router, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import rootReducer from './reducers'
import App from './App';
import Login from './components/auth/login';
// import Auth from './components/auth/require_auth';
import { AUTH_USER } from './actions/types';

const store = createstore(rootReducer, applyMiddleware(thunk, logger));

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));
