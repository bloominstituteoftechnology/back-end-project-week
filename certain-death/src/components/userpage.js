import React from 'react';
import styled from 'styled-components';
import UserRail from './userrail';
import SectionTitle from './sectiontitle';
import SignUpForm from './signupform';
import LoginForm from './loginform';

const StyledUser = styled.div`
  display: flex;

  .user-page__right {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 620px;
    min-height: 700px;
    padding: 20px;
    background-color: #f3f3f3;
  }

`;

const UserPage = () => (
  <StyledUser>
    <UserRail />
    <div className='user-page__right'>
      <SectionTitle name='Please Register Or Login Below'/>
      <SignUpForm />
      <LoginForm />
    </div>
  </StyledUser>
);

export default UserPage;
