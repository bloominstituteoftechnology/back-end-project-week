import React from 'react';
import Styled from 'styled-components'
import {Heading, Button} from './../styles/styles';
import { Link } from 'react-router-dom';
import Login from './../components/Auth/Login';
import {logoutUser} from './../actions';
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.loggedIn !== this.props.loggedIn){
      return true; 
    } return false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn){
      return true; 
    } return false;
  }

  render() {
    console.log(this.props.loggedIn);
    return(
      <Content>
        <Heading main>Lambda Notes</Heading>
        {this.props.loggedIn===true ? 
        <div>
        <Link to='/notes'><Button> View Your Notes</Button></Link>
        <Link to='/new'><Button>Create New Note</Button></Link> 
        <Button onClick={this.props.logout}>Log out</Button>
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
    loggedIn: state.users.loggedIn,
    users: state.users
  }
}

const mapActionsToProps = {
  logout: logoutUser
}

export default connect(mapStateToProps)(Sidebar);
