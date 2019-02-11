import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { StoreContext } from "redux-react-hook";
import rootReducer from "./reducers";
import App from "./containers/App";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </StoreContext.Provider>,
  document.getElementById("root")
);
