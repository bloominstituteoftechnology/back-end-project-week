// Dependencies
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CustomProperties from 'react-custom-properties';
import { connect } from 'react-redux';
// Redux

// CSS & Styling
/*import logo from './logo.svg';*/
import './App.css';
import themes from './themes';
// Components
import EnterStuff from './components/Forms/EnterStuff';
import Navbar from './components/Navbar';
import NoteList from './components/NoteList';
import ViewNote from './components/Forms/ViewNote';
import InputForm from './components/Forms/InputForm';
import ThemePicker from './components/Forms/ThemesPicker';
import WelcomePage from './components/Forms/WelcomePage';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        <CustomProperties global properties={themes[this.props.theme]} />
        <div className="row">
          <Navbar classes="col-md-4 col-lg-3 col-xl-2" />
          <div className="main-view col-md-8 col-lg-9 col-xl-10">
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route path="/register" component={EnterStuff} />
              <Route path="/login" component={EnterStuff} />
              <Route exact path="/notes" render={props => <NoteList {...props}/>} />
              <Route path="/notes/tag/:tag" render={props => <NoteList {...props} />} />
              <Route path="/notes/new" render={props => <InputForm match={props.match} />} />
              <Route path="/notes/edit/:id" render={props => <InputForm match={props.match} />} />
              <Route exact path="/notes/search" render={props => <NoteList {...props} />} />
              <Route path="/notes/:id" render={props => <ViewNote id={props.match.params.id} {...props} />} />
              <Route path="/user/styles" component={ThemePicker} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.userReducer.theme,
  }
}
export default withRouter(connect(mapStateToProps, null)(App));

/* Code I might want to keep around
  <img src={logo} className="App-logo" alt="logo" />
*/