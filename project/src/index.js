import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducer from './reducer/reducer';
import reduxThunk from 'redux-thunk';

const middleware = applyMiddleware(reduxThunk);
const state = createStore(reducer, middleware);

ReactDOM.render(
<Provider store={state} >
<App />
</Provider>
, document.getElementById('root'));
registerServiceWorker();
