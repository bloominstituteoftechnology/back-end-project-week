// react
import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// react-router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import rootReducer from './reducers';

import Root from './Root';
import Home from './components/Home/Home';
import Signup from './components/Login/Signup';
import Login from './components/Login/Login';
import App from './components/App/App';

import './styles/css/index.css';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Switch>
					<Route path="/notes/:username" component={App} />
					<Route path="/signup" component={Signup} />
					<Route path="/login/:username" component={Login} />
					<Route path="/login" component={Login} />
					<Route path="/home" component={Home} />
					<Route exact path="/" component={Root} />
				</Switch>
			</div>
		</Router>
	</Provider>,
	document.getElementById('root'),
);
