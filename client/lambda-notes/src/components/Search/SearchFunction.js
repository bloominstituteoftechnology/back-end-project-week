import React, { Component } from 'react';

class SearchFunction extends Component {

    state = {
        searchText: ''
    }

    onSearchChange = e => {
        this.setState({
            searchText: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.query.value);
        e.currentTarget.reset();
    }

    render() {
        return(
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="search"
                    onChange={this.onSearchChange}
                    name="search"
                    ref={(input) => this.query = input}
                    placeholder="Search Notes..." />
                <button className="search-button" type="submit" id="submit">Go!</button>
            </form>
        );
    }
}

export default SearchFunction;