import React, { Component } from 'react';
import { Route } from "react-router-dom";
import axios from "axios";

import Menu from "./components/menu/menu";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      notes: []
    }
  }

  componentWillMount = () => {
    axios.get("http://localhost:3001/api/allNotes")
      .then(response => {
        console.log(`Reponse: ${response.data}`);
        this.setState({notes: response.data});
      })
      .catch(err => {
        console.log(`There was an error: \n ${err}`);
      })
  }

  render() {
    console.log(this.state.notes);
    const result = this.state.notes ? this.state.notes.map((noteObj, i) => {
      return (
        <Menu key={i} noteProps={noteObj} />
        // <div key={i}>
          
        //   {/* <div>
        //     <h1 style={styles.bg}>{noteObj.title}</h1>
        //     <h1 style={styles.bg1}>{noteObj.content}</h1>
        //   </div> */}
        // </div>
      );
    }) : <h1>Loading</h1>;
    
    return (
      <div className="App" >
        {result}
      </div>
    );
  }
}

const styles = {
  bg: {
    backgroundColor: 'red'
  },
  bg1: {
    backgroundColor: 'blue'
  }
}


export default App;
