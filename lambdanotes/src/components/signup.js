import React, { Component } from 'react'; // eslint-disable-line
import styled from 'styled-components';

// Styles
const SignupStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 100vh;
  background-color: rgb(243, 243, 243);
  border-left: 1px solid rgb(151, 151, 151);
  border-right: 1px solid rgb(151, 151, 151);
  align-items: center;

  h2 {
    padding: 20px;
  }

  button {
    width: 100px;
    margin-top: 20px;
    height: 50px;
    background-color: rgb(94, 190, 195);
    color: #ffffff;
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;

    &:hover {
      border: 2px solid white;
    }
  }

  input,
  textarea {
    outline: 1px solid rgba(0 0 0 0);
    border-style: solid;
    border: 1px solid grey;
    padding: 20px;
    margin: 10px;
    width: 50%;

    &:hover {
      border-style: solid;
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid black;
    }

    &:focus {
      outline: 1px solid rgb(94, 190, 195);
      border: 1px solid rgb(94, 190, 195);
      border-style: solid;
    }
  }
`;

// Signup Component
class Signup extends Component {
  render() {
    return (
      <SignupStyled>
        <h2>Signup</h2>
        <input type="text" placeholder="Username" className="Input_Username" />
        <input type="text" placeholder="Password" className="Input_Password" />
        <input
          type="text"
          placeholder="Confirm password"
          className="Input_ConfirmPassword"
        />
        <button>Sign Up</button>
      </SignupStyled>
    );
  }
}
export default Signup;
