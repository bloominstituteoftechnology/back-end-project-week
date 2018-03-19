import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import combineReducers from './reducers/index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BroswerRouter as Route } from 'react-router-dom';
import reducers from './reducers';
import { USER_AUTHENTICATED } from './actions';


const store = createStore(combineReducers, applyMiddleware(thunk, logger));
const createStoreWithMiddleWare = applyMiddleware(ReduxThunk)(createStore);
const token = window.localStorage.getItem('token');
if (token) {
	store.dispatch({ type: USER_AUTHENTICATED });
}

const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={createStoreWithMiddleWare(reducers)}>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
