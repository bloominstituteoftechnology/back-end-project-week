import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Callback from './components/Callback/Callback';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { requireAuth } from './utils/AuthService';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={ App } />
      <Route path="/test" onEnter={requireAuth} />
      <Route path="/callback" component={Callback} />
    </div>
  </BrowserRouter>, document.getElementById('root')
);
