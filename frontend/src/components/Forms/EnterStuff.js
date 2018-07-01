import React from 'react';
import LoginForm from './login/LoginForm';
import { Link } from 'react-router-dom';

const EnterStuff = props => {
  const style = {
    "width": "65%",
    "marginRight": "auto",
    "marginLeft": "auto",
    "marginTop": "2rem"
  };

  return (
    <div style={style}>
      { 
        props.match.path === '/login' ?
          <h1>Let's Login!</h1>
        :
          <h1>Let's Register</h1>
      }
      <LoginForm {...props} />
      <br/>
      <Link to='/'>Go back.</Link>
    </div>
  );
};

export default EnterStuff;