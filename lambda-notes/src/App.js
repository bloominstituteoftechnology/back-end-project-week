import React, { Component } from 'react';
import './App.css';
import { 
  BrowserRouter as Router, 
  Route
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
import RequireAuth from './components/HOC/RequireAuth';

import { checkIfLoggedIn } from './actions/index'

class App extends Component {

  componentDidMount() {
    if(localStorage.getItem('authorization')) {
      this.props.checkIfLoggedIn()
    }
  };

  render() {

    return (
      <Router>
        <div className='App'>    
          {this.props.modal.showing ? <Route component={DeleteModal} /> : null}
          <div className='NavBar'>
            <NavBar />
          </div>
          <div className='Right'>
            <Route exact path='/' component={SignIn} />
            <Route path='/notes' component={RequireAuth(ListView)} />
            <Route path='/create' component={NewNote} />
            <Route path='/edit' component={EditNote} />
            <Route path='/notes/:id' component={FullView} />
            <Route path='/signup' component={SignUp} />
          </div>
        </div>
      </Router>
    );
  
    // const RegisteredRoute = ({ component: Component, ...rest }) => (
    //   // <Route {...rest} render={props => this.props.login ? (<Component {...props} />) : (<Redirect to='/' />)} />
    //   <Route {...rest} render={props => (
    //     localStorage.getItem('token') 
    //     ? (<Component {...props} />) 
    //     : (<Redirect to='/' />)
    //   )} />
    // )

    // return (
    //   <Router history={history}>
    //     <div className='App'>    
    //       {this.props.modal.showing ? <Route component={DeleteModal} /> : null}
    //       <div className='NavBar'>
    //         <NavBar />
    //       </div>
    //       <div className='Right'>
    //         <RegisteredRoute exact path='/' component={ListView} />
    //         <RegisteredRoute path='/notes' component={ListView} />
    //         <RegisteredRoute path='/create' component={NewNote} />
    //         <RegisteredRoute path='/edit' component={EditNote} />
    //         <RegisteredRoute path='/notes/:id' component={FullView} />
    //         <Route path='/signup' component={SignUp} />
    //         <Route path='/signin' component={SignIn} />
    //         <RegisteredRoute path='/signout' component={SignOut} />
    //         <RegisteredRoute path='/notes' render={() => (this.props.logout ? (<Redirect to='/' />) : (<Redirect to='/notes' />))} />
    //       </div>
    //     </div>
    //   </Router>
    // );
  }
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
};

export default connect(mapStateToProps, { checkIfLoggedIn })(App);
