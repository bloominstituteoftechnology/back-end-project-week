import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import PropTypes from 'prop-types';
import history from './history';


const Root = ({ store }) => (

    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
            {/* <App /> */}
        </Router>
    </Provider>
);


Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;


