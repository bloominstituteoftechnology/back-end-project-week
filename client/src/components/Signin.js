
import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <label>Username</label>
          <input
            value={this.state.email}
            onChange={this.inputChangeHandler}
            name="email"
            type="email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.inputChangeHandler}
            name="password"
            type="password"
            required
          />
        </div>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }

  submitHandler = event => {
    event.preventDefault();

    axios
      .post('http://localhost:5000/api/users/login', this.state)
      .then(response => {
        localStorage.setItem('jwt', response.data.token);

        console.log('signing props', this.props);
        this.setState({email: "", password: ""});
        this.props.history.push('/');
      })
      .catch(err => console.log('bad panda!'));
  };

  inputChangeHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
}

export default Signin;