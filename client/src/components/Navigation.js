import React from "react";
import { CSVLink } from "react-csv";
import Search from "../components/Search";

import { NavLink } from "react-router-dom";

import { NavBar, Button } from "../styles";

const Navigation = ({ editing, cancelEdit, notes, history }) =>
  localStorage.getItem("token") ? (
    <NavBar>
      <NavLink exact to="/" onClick={editing ? cancelEdit : null}>
        <h1>Lambda Notes</h1>
      </NavLink>

      <NavLink exact to="/" onClick={editing ? cancelEdit : null}>
        <Button>View Your Notes</Button>
      </NavLink>

      <NavLink to="/form">
        <Button>{editing ? "Edit Note" : "+ Create New Note"}</Button>
      </NavLink>
      <CSVLink data={notes} filename={"lambda-notes.csv"} target="_blank">
        <Button>Export to CSV</Button>
      </CSVLink>
      <Button
        onClick={e => {
          e.preventDefault();
          localStorage.removeItem("token");
          history.push("/login");
        }}
      >
        Logout
      </Button>
      <Search />
    </NavBar>
  ) : (
    <NavBar>
      <h1>Lambda Notes</h1>
      <NavLink exact to="/login">
        <Button>Log In</Button>
      </NavLink>
      <NavLink exact to="/register">
        <Button>Register</Button>
      </NavLink>
    </NavBar>
  );

export default Navigation;
