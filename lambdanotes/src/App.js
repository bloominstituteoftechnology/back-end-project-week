/* eslint-disable */

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
} from 'react-router-dom';
import AllNotes from './components/AllNotes/AllNotes';
import CreateNotes from './components/CreateNotes/CreateNotes';
import ViewNote from './components/ViewNote/ViewNote';
import LeftBar from './components/LeftBar/LeftBar';

import './App.css';

class App extends Component {
  state = {
    lnotes: [
      {
        id: 0,
        title: 'Donec tincidunt!',
        message:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat magnam aspernatur beatae laudantium, optio harum accusantium pariatur voluptatibus earum error.',
      },
      {
        id: 1,
        title: 'Vehicula dui sed',
        message: 'Est excepturi iste praesentium sequi, sint explicabo iure?',
      },
      {
        id: 2,
        title: 'Suspendisse',
        message:
          'Eum recusandae debitis atque reprehenderit! Sint illo, ut beatae dolor impedit nulla delectus sequi, doloribus quia minus nobis, ducimus quos nemo alias? Numquam suscipit soluta ullam obcaecati vitae consequatur possimus fugit.',
      },
      {
        id: 3,
        title: 'Duis tristique enim',
        message:
          'Nam quis sollicitudin nisi, at suscipit est. Suspendisse neque lectus, luctus hendrerit quam ac, lobortis placerat lorem. Nulla facilisi. Aliquam iaculis placerat quam, nec porta ipsum. Duis porttitor vehicula magna fermentum lobortis.',
      },
      {
        id: 4,
        title: 'Aenean euismod',
        message:
          'Fusce elementum commodo egestas. Sed venenatis ac sapien ac cursus. Nunc porttitor sit amet lectus sed commodo. Aliquam id lacus at nibh iaculis tempus. Sed faucibus vel felis sit amet luctus. Aliquam congue ...',
      },
      {
        id: 5,
        title: 'Nulla semper',
        message:
          'Nunc in turpis at eros placerat blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce tincidunt egestas consectetur.',
      },
    ],
  };

  addNote = note => {
    this.setState({ lnotes: [...this.state.lnotes, note] });
  };

  render() {
    return (
      <Router>
        <div className="note-app-body">
          <LeftBar />
          <Route
            exact
            path="/"
            component={props => (
              <AllNotes {...props} notes={this.state.lnotes} />
            )}
          />
          <Route
            path="/create"
            component={props => (
              <CreateNotes {...props} setAppState={this.addNote} />
            )}
          />
          <Route path="/view/:id" component={ViewNote} />
        </div>
      </Router>
    );
  }
}

export default App;

// {
//   /* <Route
// path="/:id"
// component={(props) => (
//   <CharacterDetails {...props} starwarsChars={this.state.starwarsChars} /> */
// }
