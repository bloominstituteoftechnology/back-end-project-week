import React, { Component } from 'react';
import './App.css';
import { 
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import EditNote from './components/EditNote';
import FullView from './components/FullView';
import ListView from './components/ListView';
import NavBar from './components/NavBar';
import NewNote from './components/NewNote';
import DeleteModal from './components/DeleteModal';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
// import RequireAuth from './components/HOC/RequireAuth';

import { checkIfLoggedIn } from './actions/index'

class App extends Component {

  componentDidMount() {
    if(localStorage.getItem('authorization')) {
      this.props.checkIfLoggedIn()
    }
  };

  render() {
    // const App = () => {
    //   return (
    //     <div className='App'>
    //       <NavBar />
    //       <ListView />
    //     </div>
    //   );
    // }

    const RegisteredRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => this.props.login ? (<Component {...props} />) : (<Redirect to='/' />)} />
    )

    return (
      <Router>
        <div className='App'>    
          {this.props.modal.showing ? <Route component={DeleteModal} /> : null}
          <div className='NavBar'>
            <NavBar />
          </div>
          <div className='Right'>
            <Route exact path='/' render={() => (this.props.login ? (<Redirect to='/notes' />) : (<Redirect to='/signin' />))} />
            <RegisteredRoute path='/notes' component={ListView} />
            <RegisteredRoute path='/create' component={NewNote} />
            <RegisteredRoute path='/edit' component={EditNote} />
            <RegisteredRoute path='/notes/:id' component={FullView} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <RegisteredRoute path='/signout' component={SignOut} />
            <RegisteredRoute path='/notes' render={() => (this.props.logout ? (<Redirect to='/' />) : (<Redirect to='/notes' />))} />
          </div>
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    login: state.login,
    logout: state.logout
  }
};

export default connect(mapStateToProps, { checkIfLoggedIn })(App);
