import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';


const LandingStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: #342D33;
  color: #E3FFD5;
`;
class Landing extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }


  render() {
    return (
      <LandingStyle>
          <h1>TACK</h1>
        <Link to="/menu">Menu</Link>
      </LandingStyle>
    );
  }
}

export default Landing;
