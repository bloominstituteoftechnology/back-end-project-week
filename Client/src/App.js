import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NoteForm from './components/noteForm';
import Note from './components/note';
import DisplayNotesList from './components/displayNotesList';
import Register from './components/register';
import SignOut from './components/logout';
import {login} from './actions/index.js';
import RequireAuth from '../src/components/HOC/RequireAuth';

const routes = [
  {
    path:"/",
    main: (props) => <App {...props} />,
    exact: true
  },
  {
    path: "/displayNotes",
    sidebar: () => <Button>View Notes</Button>,
    main: (props) => {RequireAuth(DisplayNotesList)}
  },
  {
    path: "/logout",
    sidebar: () => <Button>Sign Out</Button>,
    main: () => <SignOut/>
  },
  {
    path: "/createNote",
    sidebar: () => <Button>+ Create New Note</Button>,
    main: () =><Container><NoteForm /></Container>
  },
  {
    path: "/viewNote/:id",
    main: Note
  },
  {
    path:"/editNote/:id",
    main: NoteForm,
  }
];

class App extends Component {
  state = {
    authed: false,
    username: '',
    password: '',
  };

  loginSubmitHandler = (event) => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({password:''});
    if(!this.props.authed) {
      this.props.history.push('/displayNotes');
    }
  };

  loginInputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value});
  }

  

  render() {
    document.body.style.background = "#f3f3f3";
    //if not authed reutrn the signin/signup page which is App.js
    //if(!authed) {do something}
    if(!this.state.authed) {
      return (
        <Router>
          <Container fluid = {true} className = "App">
            <Row className="app-wrapper">
              <Col sm = {3} className = "leftSide position-fixed">
                <h1 className = "header my-4">Lambda Notes</h1>
                <Form onSubmit = { this.loginSubmitHandler.bind(this) }>
                  <FormGroup>
                    <Label for = "username">User Name</Label>
                    <Input className='d-flex w-125 p-2' required type="text" name = "username" value = {this.state.username} onChange = { this.loginInputHandler } placeholder = "Enter your user name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Password">Password</Label>
                    <Input className='d-flex w-100 p-2' required type = "password" name = "password" value = {this.state.password} onChange = { this.loginInputHandler } placeholder = "Enter your password" />
                  </FormGroup>
                  <Button>Sign In</Button>
                </Form>
              </Col>
              <Col sm = {9} className = "rightSide offset-3">
                <Register/>
              </Col>
            </Row>
          </Container>
        </Router>
      );
    }
    //if (authed) change the sidebar to have the display Notes and create note component
    else if (this.state.authed){
      return (
        <Router>
          <Container fluid={true} className="App">
            <Row className="app-wrapper">
              <Col sm={3} className="leftSide position-fixed">
                <h1 className="header my-4">Lambda Notes</h1>
                <Link to ="/displayNotes"><Button className="w-100 my-2 p-2">View Your Notes</Button></Link>
                <Link to ="/createNote"><Button className="w-100 my-2 p-2">+ Create New Note</Button></Link>
                <Link to ="/logout"><Button className="w-100 my-2 p-2">Sign out</Button></Link>
              </Col>
              <Col sm={9} className="rightSide offset-3">
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </Col>
            </Row>
          </Container>
        </Router>
      );
    }
  };
};

Container.propTypes = {
  fluid: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    state: state.notes,
    authed: state.authed,
  };
};

export default connect(mapStateToProps, {login})(App);
