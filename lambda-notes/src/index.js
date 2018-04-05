import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
// import Auth from './components/authenticator';
import SignIn from './components/signin';
import SignUp from './components/signup';
import SignOut from './components/signout';
import RequireAuth from './components/HOC/requireAuth';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <Router>
      <div>
        {/* <Route path="/" component={Auth} /> */}
        <Route path="/signin" component={SignIn} />
        <Route path="/" component={RequireAuth(App)} />
        <Route path="/signout" component={SignOut} />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);


