import React, { Component } from 'react';

class SearchFunction extends Component {

    state = {
        searchText: '',
        notes:[],
    }

    onSearchChange = e => {
        const { notes, searchText } = this.state;
	if (searchText.length !== 0) {
		const newNotes = notes.filter((note) => note.text.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
		this.setState({ notes: newNotes });
	} else {
		this.setState({ ...notes });
	}

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.state.searchText);
        e.currentTarget.reset();
    }

    render() {
        return(
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="search"
                    onChange={this.onSearchChange}
                    name="search"
                    
                    placeholder="Search Notes..." />
                <button className="search-button" type="submit" id="submit">Go!</button>
            </form>
        );
    }
}

export default SearchFunction;