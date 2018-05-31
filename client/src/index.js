import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import theme from './Helper/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

ReactDOM.render(
    <Router>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Router>, document.getElementById('root'));
registerServiceWorker();
