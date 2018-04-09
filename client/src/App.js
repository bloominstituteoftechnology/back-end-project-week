import React, {Component, Fragment} from 'react';
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";

import './App.css';
import NoteListPage from "./components/NoteListPage";
import AddNotePage from "./components/AddNotePage";
import EditNotePage from "./components/EditNotePage";
import ViewNotePage from "./components/ViewNotePage";
import LogInPage from "./components/LogInPage";
import SignUpPage from "./components/SignUpPage";

class App extends Component {

  /*constructor(props) {
    super(props);
    // props.actions.getSmurfData();
  }*/

  render() {
    return (
      <BrowserRouter>
        <div className="App container">
          <div className="main">
            <Switch>
              <Route exact path="/" component={LogInPage}/>
              <Route exact path="/sign-up" component={SignUpPage}/>
              <Route render={() => {
                return (
                  <Fragment>
                    <div className="sidenav">
                      <h3>Lambda Notes</h3>
                      <NavLink to="/notes">View Your Notes</NavLink>
                      <NavLink to="/add-note">Create New Note</NavLink>
                    </div>
                    <Switch>
                      <Route exact path="/notes" component={NoteListPage}/>
                      <Route path="/add-note" component={AddNotePage}/>
                      <Route path="/edit-note/:id" component={EditNotePage}/>
                      <Route path="/view-note/:id" component={ViewNotePage}/>
                    </Switch>
                  </Fragment>
                )
              }}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
