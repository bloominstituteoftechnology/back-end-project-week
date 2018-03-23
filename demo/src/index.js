import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';

ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={Register}/>
			<Route exact path='/profile' component={App}/>
			<Route exact path='/login' component={Login}/>
		</div>
	</Router>,
 	document.getElementById('root'));
registerServiceWorker();
