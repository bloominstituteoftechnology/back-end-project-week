import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Register from "./components/logging/Register";
import Homepage from "./components/logging/Homepage";
import Login from "./components/logging/Login";
import NoteDisplayer from "./components/notes/NoteDisplayer";
import { App } from "./components";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/front" component={Homepage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/notes" component={NoteDisplayer} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
