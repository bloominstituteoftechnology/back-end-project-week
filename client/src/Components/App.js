import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { persistLogIn } from '../Actions/index';

import ViewNotes from './view';
import Navi from './navi';
import LogIn from './login';

class App extends Component {
    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.persistLogIn();
        }
    }

    render() {
        const App = () => {
            return (
                <div className="App">
                    <Navi />
                    <ViewNotes />
                </div>
            );
        };
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={props =>
                    this.props.loggedIn ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
        );
        return (
            <div>
                <PrivateRoute path="/notes" component={App} />
                <Route
                    exact
                    path="/"
                    render={() =>
                        this.props.loggedIn ? (
                            <Redirect to="/notes" />
                        ) : (
                            <LogIn />
                        )
                    }
                />
                <Route
                    path="/notes"
                    render={() =>
                        this.props.loggedOut ? (
                            <Redirect to="/" />
                        ) : (
                            <Route to="/notes" />
                        )
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        loggedOut: state.loggedOut
    };
};

export default withRouter(connect(mapStateToProps, { persistLogIn })(App));
