import React from 'react';
import styled from 'styled-components';

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

`;

const UserRail = props => (
  <StyledRail>
    <img src='https://res.cloudinary.com/jonbrunt/image/upload/v1519920433/JMB-Logo_htviyf.png' alt='JMB Logo' />
  </StyledRail>
);

export default UserRail;
