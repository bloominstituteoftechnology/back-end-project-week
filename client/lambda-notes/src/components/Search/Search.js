import React, { Component } from 'react';
import axios from 'axios';
import Suggestions from './Suggestions'

const { API_KEY } = process.env;
const API_URL = 'https://safe-tor-44897.herokuapp.com/api/notes';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: []
        };
     }

getInfo = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
    .then(response => {
        this.setState(() => ({ results: response.data }))
    })
    .catch(error => console.log(error));  
}
    

handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
    }
    })
  }

 render() {
   return (
     <form>
       <input
         placeholder="Search for..."
         ref={input => this.search = input}
         onChange={this.handleInputChange}
       />
       <Suggestions results={this.state.results} />
     </form>
   )
 }
}

export default Search