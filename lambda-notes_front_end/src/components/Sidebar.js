import React from 'react';
import Styled from 'styled-components'
import {Heading, Button} from './../styles/styles';
import { Link } from 'react-router-dom';
import Login from './../components/Auth/Login';
import Register from './../components/Auth/Register';
import { connect } from 'react-redux';


const Content = Styled.div`
  background: #D8D8D8;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;
  height: 100vh;
  padding: 5px;
`;


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    console.log(this.props.loggedIn);
    return(
      <Content>
        <Heading main>Lambda Notes</Heading>
        {this.props.loggedIn ? 
        <div>
        <Link to='/notes'><Button> View Your Notes</Button></Link>
        <Link to='/new'><Button>Create New Note</Button></Link> 
        </div>
        : 
        <div>
        <Login /> <Register /> 
        </div>}    
        </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.users.loggedIn
  }
}

export default connect(mapStateToProps)(Sidebar);
