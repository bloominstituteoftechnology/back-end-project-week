import React, { Component } from "react";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from 'axios'; 
import AddNote from "./components/AddNote";
import NotesView from "./components/NotesView";
import Note from "./components/Note";
import Edit from "./components/Edit";
import Search from "./components/Search";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      id: null,
      title: "",
      note: "",
      search: "",
      username: "",
      password: "", 
      video: "",     
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const reqOptions = {
        headers: {
            Authorization: token,
        }
    };

    axios.get('http://localhost:5000/notes', reqOptions)
      .then(notes => {
        this.setState({notes: notes.data.notes}); 
      })
      .catch(err => {
        console.log(err); 
      });
    
 }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSaveHandler = e => {
    e.preventDefault();

    let notes = {
      title: this.state.title,
      note: this.state.note
    };

    axios.post('http://localhost:5000/notes', notes)
      .then(notes => {
        return (axios.get('http://localhost:5000/notes')
        .then(notes => {
          this.setState({notes: notes.data.notes}); 
        })
        .catch(err => {
          console.log(err); 
        }));
      })
      .catch(err => {
        console.log(err); 
      });
  };

  onUpdateHandler = (e, id) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt');
    const reqOptions = {
        headers: {
            Authorization: token,
        }
      }

    let edit = {
      title: this.state.title,
      note: this.state.note
    };

    axios.put(`http://localhost:5000/notes/${id}`, edit)
      .then(notes => {
        return (axios.get('http://localhost:5000/notes', reqOptions)
          .then(notes => {
            this.setState({notes: notes.data.notes}); 
          })
          .catch(err => {
            console.log(err); 
          }));
        })
      .catch(err => {
        console.log(err); 
        });
  };

  deleteHandler = (e, id) => {
    e.preventDefault();
    
    axios.delete(`http://localhost:5000/notes/${id}`)
      .then(notes => {
        return (axios.get('http://localhost:5000/notes')
          .then(notes => {
            this.setState({notes: notes.data.notes}); 
          })
          .catch(err => {
            console.log(err); 
        }));
      })
      .catch(err => {
        console.log(err); 
      });  
      
  };

  onHandlerSearch = e => {
    e.preventDefault();

    const token = localStorage.getItem('jwt');
    const reqOptions = {
        headers: {
            Authorization: token,
        }
    };

    axios.get('http://localhost:5000/notes', reqOptions)
    .then(notes => {
      this.setState({notes: notes.data.notes}); 
    })
    .catch(err => {
      console.log(err); 
    });

    setTimeout(() => {
    let searchTerm = this.state.search; 
    let notes = this.state.notes.slice();
    let result = [];

    notes.map(notes => {
      if(notes.title.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
        result.push(notes);  
      }
    })
     
    this.setState({notes: result});
    
    }, 20)

  };

  resetPage = () => {
    window.location.reload(true)
  };

  onRegisterHandler = e => {
    e.preventDefault(); 

    let newUser = {
      username: this.state.username, 
      password: this.state.password, 
    }; 

    axios
    .post("http://localhost:5000/register", newUser)
      .then(res => {
       localStorage.setItem('jwt', res.data.token);
     })
      .catch(err => {
      console.log(err);
     })
  };

  onLoginHandler = e => {
    e.preventDefault(); 

    let login = {
      username: this.state.username, 
      password: this.state.password, 
    }; 

    axios
    .post("http://localhost:5000/login", login)
    .then(res => {
        localStorage.setItem('jwt', res.data.token);
    })
    .catch(err => {
        console.log(err);
    })
  }


  render() {
    console.log("app state", this.state.notes);
    return (
      <div className="app">
        <div className="navbar">
          <div className="navbar-title">Lambda Notes</div>
          
          <NavLink 
            className="navlink" 
            exact to="/"
            onClick={this.resetPage}>
            View Your Notes
          </NavLink>
          
          <NavLink 
            className="navlink" 
            to="/add-note">
            + Create New Note
          </NavLink>

          <NavLink 
            className="navlink" 
            to="/login">
            Login
          </NavLink>

          <NavLink 
            className="navlink" 
            to="/register">
            Register
          </NavLink>
           
          <Search
            inputHandler={this.inputHandler}
            onHandlerSearch={this.onHandlerSearch}>
          </Search>

        </div>

        <div className="notesbody">
          <Route
            exact
            path="/"
            render={props => 
              <NotesView 
                {...props} 
                notes={this.state.notes}
                 />}
          />

          <Route
            path="/add-note"
            render={props => (
              <AddNote
                {...props}
                inputHandler={this.inputHandler}
                onSaveHandler={this.onSaveHandler}
              />
            )}
          />

          <Route
            path="/note/:id"
            render={props => (
              <Note
                {...props}
                notes={this.state.notes}
                deleteHandler={this.deleteHandler}
              />
            )}
          />

          <Route
            path="/edit/:id"
            render={props => (
              <Edit
                {...props}
                notes={this.state.notes}
                inputHandler={this.inputHandler}
                onUpdateHandler={this.onUpdateHandler}
              />
            )}
          />

          <Route
            path="/login"
            render={props => (
            <Login
                {...props}
                inputHandler={this.inputHandler}
                onLoginHandler={this.onLoginHandler}
              />
            )}
          />

          <Route
            path="/register"
            render={props => (
            <Register
                {...props}
                inputHandler={this.inputHandler}
                onRegisterHandler={this.onRegisterHandler}
              />
            )}
          />

        </div>
      </div>
    );
  }
}
