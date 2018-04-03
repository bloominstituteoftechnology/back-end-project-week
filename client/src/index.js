import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reducers from './reducers';
import SignUp from './components/signup';
const sotreWithMW = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={sotreWithMW(reducers)}>
    <Router>
      <div>
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
