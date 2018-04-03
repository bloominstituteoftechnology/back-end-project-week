import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import AccessControl from './components/AccessControl';

import './index.css';
import App from './App';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
        <div>
          <Route path="/" component={AccessControl(App)} exact/>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          {/* <Route path="/notes" component={NoteList} /> */}
          {/* <Route path="/signout" component={SignOut} />
          <Route path="/signup" component={SignUp} /> */}
        </div>
      </Router>
    </Provider>,
  document.getElementById('root')
);