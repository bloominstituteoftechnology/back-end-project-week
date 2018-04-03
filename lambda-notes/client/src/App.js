// import React, { Component } from 'react';
// // import ListView from './components/listview.js';
// // import NewView from './components/newview.js';
// // import NoteView from './components/noteview.js';
// // import EditView from './components/editview.js';
// // import Delete from './components/icons/delete.js';
// import Registration from './components/registration.js';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//  <Registration />
//           // <Router>
//           //   <div>
//           //   <Route exact path='/' component={ListView} exact/>
//           //   <Route path='/newview' component={NewView}/>
//           //   <Route path='/noteview' component={NoteView}/>
//           //   <Route path='/editview' component={EditView}/>
//           //   <Route path='/delete' component={Delete}/>
//           //   </div>
//           // </Router>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;