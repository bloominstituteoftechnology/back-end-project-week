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
import SignIn from './components/signin';
import RequireAuth from './components/RequireAuth';
import SignOut from './components/signout';
import SingleNote from './components/singleNote';
import NoteForm from './components/noteForm';
import DeleteModal from './components/deleteModal';
import NoteList from './components/noteList';
//import SideBar from './components/sideBar';

const sotreWithMW = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={sotreWithMW(reducers)}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <Route path="/notelist" component={RequireAuth(NoteList)} />
        <Route path="/signout" component={SignOut} />
        {/* {<Route path="/" component={SideBar} exact />} */}
        <Route path="/note/:id" component={RequireAuth(SingleNote)} />
        <Route path="/noteform" component={RequireAuth(NoteForm)} exact />
        <Route path="/delete/:id" component={RequireAuth(DeleteModal)} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
