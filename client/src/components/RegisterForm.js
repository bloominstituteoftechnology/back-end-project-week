import React, { Component } from "react";
import axios from "axios";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: ""
    };
  }

  register = event => {
    event.preventDefault();
    const user = {
      username: this.state.name,
      password: this.state.password
    };
    axios
      .post("http://localhost:5000/api/users/register", user)
      .then(response => {
        this.props.history.push(`/`).catch(err => {
          console.log(err);
        });
      });

    this.setState({
      name: "",
      password: ""
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="col-9 right__side">
        <div className="row">
          <div className="col-3 notes__head">
            <h2>Register new user: </h2>
          </div>
        </div>
        <div className="row">
          <form className="add__form">
            <input
              className="input__title"
              onChange={this.handleInputChange}
              placeholder="name"
              value={this.state.name}
              name="name"
            />
            <input
              className="input__title"
              onChange={this.handleInputChange}
              placeholder="password"
              value={this.state.password}
              name="password"
            />
            <button
              className="save__button"
              type="submit"
              onClick={this.register}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
