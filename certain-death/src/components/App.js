import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import UserPage from './userpage';
import List from './list';
import NewNote from './newnote';
import FullNote from './fullnote';
import UpdateNote from './updatenote';

const StyledApp = styled.div`
  width: 830px;
  margin: 20px auto 20px;
  border: 1px solid #bfbfc0;
  border-radius: 2px;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <StyledApp>
          <Route path='/' component={UserPage} exact />
          <Route path='/list' component={List} exact />
          <Route path='/fullnote/:id' component={FullNote} />
          <Route path='/newnote' component={NewNote} />
          <Route path='/updatenote/:id' component={UpdateNote} />
          {/* <Route path='*' component={NotFound} /> */}
        </StyledApp>
      </Router>
    );
  }
}

export default App;
