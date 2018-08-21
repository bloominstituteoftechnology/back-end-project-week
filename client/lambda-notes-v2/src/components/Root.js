import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import PropTypes from 'prop-types';


const Root = ({ store }) => (

    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>
);


Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;


