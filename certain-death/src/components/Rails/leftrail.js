import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../Misc/button';

const StyledRail = styled.div`
  width: 210px;
  min-height: 400px;
  padding: 15px;
  background-color: #d7d7d7;
  border-right: 1px solid #bfbfc0;

  img {
    height: 100px;
    width: 100px;
  }

`;

const LeftRail = props => (
  <StyledRail>
    {/* <h1>Operation Babylon</h1> */}
    <img src='https://res.cloudinary.com/jonbrunt/image/upload/v1519920433/JMB-Logo_htviyf.png' alt='JMB Logo' />
    <Link to='/list' style={{ textDecoration: 'none' }}>
      <Button backgroundColor='rgb(34, 170, 61)' title='View Your Notes' />
    </Link>
    <Link to='/newnote' style={{ textDecoration: 'none' }}>
      <Button backgroundColor='rgb(34, 170, 61)' title='+ Create New Note' />
    </Link>
  </StyledRail>
);

export default LeftRail;
