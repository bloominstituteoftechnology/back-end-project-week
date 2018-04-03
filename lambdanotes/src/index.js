import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

import './index.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div className="MainApp">
      <App />
    </div>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
