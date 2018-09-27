import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Tack from '../../tack.svg';


const LandingStyle = styled.div`
   width:420px;
  height:605px;
  margin:0 auto;
  display: flex;
  flex-flow: column;
  align-items:center;
  background-color: #342D33;
  color: #E3FFD5;
`;

const imgStyle = {
  width:'95%',
  margin:'25% auto 5% ',
};

const linkStyle = {
  fontFamily: 'sans-serif',
  fontSize:'4rem',
  textDecoration:'none',
  color: '#E3FFD5'
}
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
        <div><img src={Tack} style={imgStyle}/></div>
        <Link to="/menu" style={linkStyle}>Menu</Link>
      </LandingStyle>
    );
  }
}

export default Landing;
