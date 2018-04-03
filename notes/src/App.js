import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles/App.css';

// Components
import Sidebar from './comps/Sidebar';
import NoteList from './comps/NoteList';
import Note from './comps/Note';
import NewNote from './comps/NewNote';
import EditNote from './comps/EditNote';
import Modal from './comps/Modal';
import Login from './comps/Login';

// HOC
import RequireAuth from './comps/RequireAuth';

class App extends React.Component {
  render() {
    return (
      <div className="App__container">
        {this.props.modalVisible && (
          <div className="modal-container">
            <Modal />
          </div>
        )}
        <Sidebar />
        <div className="content__container">
          <Route exact path="/" component={RequireAuth(NoteList)} />
          <Route path="/view/:id" component={RequireAuth(Note)} />
          <Route path="/new" component={RequireAuth(NewNote)} />
          <Route path="/edit/:id" component={RequireAuth(EditNote)} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalVisible: state.modalVisible,
  };
};

export default withRouter(connect(mapStateToProps)(App));
