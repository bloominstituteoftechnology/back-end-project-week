import React, { Component } from 'react';
import { Route, withRouter} from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Posts from "./components/Posts";
import SideBar from "./components/SideBar";
import AddPostForm from "./components/AddPostForm";
import SinglePost from "./components/SinglePost";
import './App.css';

class App extends Component {
  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');

      this.props.history.push('/signin');
    }
  };

  render() {
    return (
      <div className="App">
          <Header />
          <section className="main">
            <SideBar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/new" component={AddPostForm} />
            <Route path="/posts/:id" component={SinglePost} />
            </section>
        {/* <section className="main">
              <SideBar />
                  <Route path="/" component={() => <NotesList myNotes={this.props.notes}/>} exact/>
                  <Route path="/new" component={AddNoteForm} exact/>
                  <Route path="/show/:id" component={ShowNote} />
                  <Route path="/edit/:id" component={NoteEdit} />
              </section> */}
      </div>
    );
  }
}

export default withRouter(App);
