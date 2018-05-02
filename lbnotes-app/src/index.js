import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Login from './components/Login';
// import Register from './components/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div className="MainApp">
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
