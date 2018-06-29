
import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
  state = {
    email: '',
    password: '',
  };

//   <div className="login-page">
//   <div className="login-wrapper">
//     <h1>Welcome To Lambda Note Taking App</h1>
//     <p>Please login with your google account</p>
//     <button
//           onClick={this.props.googleLogin}
//     >Sign in with google</button>
//   </div>
// </div>

  render() {
    return (
      // <form onSubmit={this.submitHandler}>
      //   <div>
      //     <label>Username</label>
      //     <input
      //       value={this.state.email}
      //       onChange={this.inputChangeHandler}
      //       name="email"
      //       type="email"
      //       required
      //     />
      //   </div>
      //   <div>
      //     <label>Password</label>
      //     <input
      //       value={this.state.password}
      //       onChange={this.inputChangeHandler}
      //       name="password"
      //       type="password"
      //       required
      //     />
      //   </div>
      //   <div>
      //     <button type="submit">Signin</button>
      //   </div>
      // </form>

<div className="add-note">
<h2>Sign In</h2>
<form onSubmit={this.submitHandler}>
    <input
      className="add-title"
      // name="title"
      // onChange={this.handleChange}
      // value={this.state.title}
      // required
      // placeholder="Enter Title"
      value={this.state.email}
            onChange={this.inputChangeHandler}
            name="email"
            type="email"
            required
            placeholder="Email"
    />
    <br />
    <input
      className="add-title"
      onChange={this.inputChangeHandler}
      value={this.state.password}
      type="password"
      name="password"
      required
      placeholder="Password"
    />
    {/* </input> */}
    <br />
    <button className="add-btn">
      Sign In
    </button>
  </form>
</div>
    );
  }

  submitHandler = event => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post('http://localhost:5555/api/users/login', this.state)
      .then(response => {
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
        console.log('signing props', this.props);
        this.setState({email: "", password: ""});
        this.props.history.push('/posts');
      })
      .catch(err => console.log('bad panda!'));
  };

  inputChangeHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
}

export default Signin;