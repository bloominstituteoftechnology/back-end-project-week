import React from 'react';
import ReactDOM from 'react-dom';
import './css/less/index.css';
import App from './App';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import Notes from './components/Notes';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RequireAuth from './components/HOC/RequireAuth';

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(rootReducer)}>
		<Router>
			<div>
				<Navigation />
				<Route path="/" component={LandingPage} exact/>
				<Route path="/notes" component={RequireAuth(Notes)} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);
