import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NoteCard from './notecard';
import HomeLeftRail from './homeleftrail';
import SectionTitle from './sectiontitle';

const StyledList = styled.div`
  display: flex;

  .list__links {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    a {
      margin: 0 5px;
      font-family: Raleway, sans-serif;
      font-weight: 700;
      font-size: 1.2rem;
      color: #4a494a;      
    }
  }

  .list__right {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 620px;
    min-height: 700px;
    padding: 20px;
    background-color: #f3f3f3;
  }

`;

const List = props => (
  <StyledList>
    <HomeLeftRail />
    <div className='list__right'>
      <div className='list__links'>
        <Link to={'/newnote'}>sign up</Link>
        <Link to={'/newnote'}>login</Link>
      </div>
      <SectionTitle name={`Your Notes (${props.sortStatus}):`}/>
      {props.notes.map((note, index) => {
        return (
          note.filtered ? null : <NoteCard key={index} note={note} />
        );
      })}
    </div>
  </StyledList>
);

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    sortStatus: state.sortStatus,
  };
};

export default connect(mapStateToProps, null)(List);
