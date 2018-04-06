import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Register from "./components/logging/Register";
import Homepage from "./components/logging/Homepage";
import Login from "./components/logging/Login";
import LogOut from "./components/logging/LogOut";
import NoteDisplayer from "./components/notes/NoteDisplayer";
import RequireAuth from './components/HOC/Authorization';
import { App } from "./components";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/front" component={Homepage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/signout" component={LogOut} />
        <Route path="/notes" component={RequireAuth(NoteDisplayer)} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
