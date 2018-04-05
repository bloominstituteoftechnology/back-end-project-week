import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserRail from '../Rails/userrail';
import SectionTitle from '../Misc/sectiontitle';
import SignUpForm from '../Forms/signupform';
import LoginForm from '../Forms/loginform';

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

class UserPage extends Component {
  render() {
    return (
      <StyledUser>
        <UserRail />
        <div className='user-page__right'>
          <SectionTitle name='Please Register Or Login Below'/>
          <SignUpForm />
          <LoginForm history={this.props.history}/>
        </div>
        {this.props.loggedIn ? <Redirect to={'/list'} /> : null}
      </StyledUser>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, null)(UserPage);
