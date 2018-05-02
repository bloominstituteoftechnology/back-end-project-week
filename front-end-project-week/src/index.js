import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { requireAuth } from './utils/AuthService';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// import Authenticator from './components/Authenticator/Authenticator';

ReactDOM.render(
  <Router>
    <App onEnter={requireAuth} />
  </Router>,

  document.getElementById('root')
);
registerServiceWorker();
