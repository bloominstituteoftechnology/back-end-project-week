import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { login, signup } from '../actions';
import Button from './button';

const StyledRail = styled.div`
  width: 210px;
  min-height: 400px;
  padding: 15px;
  background-color: #d7d7d7;
  border-right: 1px solid #bfbfc0;

  img {
    height: 100px;
    width: 100px;
    margin-bottom: 20px;
  }

  .user-rail__buttons {
    margin-top: 40px;
  }
`;

const UserRail = props => (
  <StyledRail>
    <img src='https://res.cloudinary.com/jonbrunt/image/upload/v1519920433/JMB-Logo_htviyf.png' alt='JMB Logo' />
    <div className='user-rail__buttons'>
      <Button method={props.login} backgroundColor='rgb(34, 170, 61)' title='Sign Up' />
      <Button method={props.signup}backgroundColor='rgb(34, 170, 61)' title='Login' />
    </div>
  </StyledRail>
);

export default connect(null, { login, signup })(UserRail);
