import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import UserPage from './Pages/userpage';
import List from './Pages/list';
import NewNote from './Pages/newnote';
import FullNote from './Pages/fullnote';
import UpdateNote from './Pages/updatenote';

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
          <Route path='/list' component={List} />
          <Route path='/fullnote/:id' component={FullNote} />
          <Route path='/newnote' component={NewNote} />
          <Route path='/updatenote/:id' component={UpdateNote} />
        </StyledApp>
      </Router>
    );
  }
}

export default App;
