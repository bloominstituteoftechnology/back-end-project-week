import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import axios from 'axios';
import { domain } from '../../config/dev';
import { connect } from 'react-redux';
import { putResultsToStore } from '../Actions';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  getSearchResults = e => {
    e.preventDefault();
    console.log('this.props',this.props);
    console.log('uid',this.props.user.uid);
    const header = { "headers": { "authorization": this.props.user.uid } };
    axios.get(`${domain}/notes/search?terms=${this.state.search}`,header)
      .then(results => {
        console.log('search results:', results);
        this.props.putResultsToStore(results.data);
        this.props.history.push('/notes/search');
      })
      .catch(error => {
        console.log('getSearchResults ERROR:',error);
        alert('Error retrieving search results.');
      });
  }

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render = () => {
    const style = {
      "margin":"1rem"
    };

    return (
      <Form onSubmit={this.getSearchResults}>
        <Form.Field>
          <Input 
            style={style} 
            icon='search' 
            name='search' 
            onChange={this.handleTextChange}
            placeholder='Search...' 
          />
        </Form.Field>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}

export default withRouter(connect(mapStateToProps, { putResultsToStore })(SearchBar));
