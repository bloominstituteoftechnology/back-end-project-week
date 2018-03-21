import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Router } from 'react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import history from './helpers/history'


import rootReducer from './reducers'
import App from './App';
import Login from './components/auth/login';
// import Auth from './components/auth/require_auth';
import { AUTH_USER } from './actions/types';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <Route path='Login' component={Login} />
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
