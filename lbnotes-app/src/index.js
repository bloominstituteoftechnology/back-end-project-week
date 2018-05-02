import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// import Login from './components/Login';
// import Register from './components/Register';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div className="MainApp">
      <App />
    </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
