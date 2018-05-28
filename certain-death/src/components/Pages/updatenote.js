import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import LeftRail from '../Rails/leftrail';
import SectionTitle from '../Misc/sectiontitle';
import UpdateForm from '../Forms/updateform';

const StyledUpdateNote = styled.div`
  display: flex;

  .update-note__right {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 620px;
    min-height: 700px;
    padding: 20px;
    background-color: #f3f3f3;
  }

`;

const UpdateNote = props => (
  <StyledUpdateNote>
  {props.loggedIn ? null : <Redirect to={'/'} /> }
    <LeftRail />
    <div className='update-note__right'>
      <SectionTitle name='Edit Your Note:'/>
      <UpdateForm id={props.match.params.id} history={props.history}/>
    </div>
  </StyledUpdateNote>
);

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, null)(UpdateNote);
