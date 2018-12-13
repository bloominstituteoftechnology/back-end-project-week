import React, { Component } from 'react';
import SearchFunction from './SearchFunction'
import Suggestions from './Suggestions'



class Search extends Component {

  constructor() {
    super();
    this.state = {
      results: [],
      loading: false
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'camping') => {
    fetch(`https://safe-tor-44897.herokuapp.com/api/notes`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          results: responseData.results.data,
          loading: false
        });
        console.log(this.state.results)
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {

    return ( 
      <div className = "App">
        <SearchFunction onSearch = {this.performSearch} /> 
        <div> 
          {
            (this.state.loading) ? <p>Loading</p> :<Suggestions results={this.state.results} />
          } 
        </div> 
      </div>
    );
  }
}

export default Search;