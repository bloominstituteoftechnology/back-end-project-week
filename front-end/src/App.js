import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
// import Greeting from './components/greeting';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Test from './components/test';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={NavBar} />
                    <Route exact path="/signup" component={Test} />
                    <Route exact path="/signin" component={Test} />
                    <Route exact path="/notes" component={Test} />
                    <Route exact path="/users" component={Test} />
                </div>
            </Router>
        );
    }
}

export default App;
