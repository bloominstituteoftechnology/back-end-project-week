import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LeftRail from '../Rails/leftrail';
import SectionTitle from '../Misc/sectiontitle';
import PostForm from '../Forms/postform';

const StyledNewNote = styled.div`
  display: flex;

  .new-note__right {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 620px;
    min-height: 700px;
    padding: 20px;
    background-color: #f3f3f3;
  }

`;

const NewNote = props => (
  <StyledNewNote>
  {props.loggedIn ? null : <Redirect to={'/'} /> }
    <LeftRail />
    <div className='new-note__right'>
      <SectionTitle name='Create A New Note:'/>
      <PostForm history={props.history}/>
    </div>
  </StyledNewNote>
);

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, null)(NewNote);
