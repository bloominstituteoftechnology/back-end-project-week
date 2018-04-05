import React from 'react'; //eslint-disable-line
import styled from 'styled-components';

// Styles
const SideBarStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 100%;
  min-height: 100vh;
  /* border-right: 1px solid rgb(151, 151, 151); */
  padding: 20px;
  background-color: rgb(216, 216, 216);
  flex-grow: 1;

  h1 {
    margin-bottom: 31px;
    padding-top: 10px;
    width: 150px;
  }

  .SidebarContainer {
    // position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const ButtonStyled = styled.button`
  margin-bottom: 20px;
  font-family: Roboto;
  height: 50px;
  width: 150px;
  background-color: rgb(94, 190, 195);
  color: #ffffff;
  outline: none;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  /* position: absolute; */

  &:hover {
    border: 2px solid rgb(243, 243, 243);
  }
`;

// Sidebar Component
const Sidebar = props => {
  return (
    <SideBarStyled className="Sidebar">
      <div className="SidebarContainer">
        <h1>Lambda Notes</h1>
        {!props.authenticated &&
          props.showingLogin &&
          !props.showingSignup && <ButtonStyled onClick={props.showSignup}>Sign Up</ButtonStyled>}

        {!props.authenticated &&
          props.showingSignup &&
          !props.showingLogin && <ButtonStyled onClick={props.showLogin}>Login</ButtonStyled>}

        {props.authenticated && (
          <div>
            <ButtonStyled onClick={props.viewNotes}>
              View Your Notes
            </ButtonStyled>
            <ButtonStyled onClick={props.createNewNoteForm}>
              + Create New Note
            </ButtonStyled>

            <ButtonStyled onClick={props.logoutUser}>Logout</ButtonStyled>
          </div>
        )}
      </div>
    </SideBarStyled>
  );
};

export default Sidebar;
