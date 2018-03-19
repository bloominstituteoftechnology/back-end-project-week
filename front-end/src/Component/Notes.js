import React, { Component } from "react";
import { connect } from "react-redux";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      tags: false,
      addTags: false
    };
  }

  searchChangeHandler = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  hoverToggle = () => {
    const active = this.state.tags;
    this.setState({ tags: !active });
  };

  mouseOut = () => {
    this.setState({ tags: false });
  };

  addTags = () => {
    const active = this.state.addTags;
    this.setState({ addTags: !active });
  };

  render() {
    const filter = this.props.notes.filter(note =>
      note.Title.toLowerCase().includes(this.state.search.toLowerCase())
    );
    return (
      <div className="Notes">
        <div className="Notes--Search">
          <input
            placeholder="Search..."
            name="search"
            value={this.state.search}
            onChange={this.searchChangeHandler}
          />
        </div>
        <ul>
          {filter.map((note, index) => {
            return (
              <li
                className="note"
                onClick={() => {
                  this.props.previewNote(note.Title, note.Text, note.ID);
                }}
                key={note.ID}
                onMouseOver={this.hoverToggle}
                onMouseOut={this.mouseOut}
              >
                <div className="note--title">
                  {note.Title.length > 30
                    ? note.Title.substring(0, 30).concat("...")
                    : note.Title}
                </div>
                <br />
                <div className="note--text">
                  {note.Text.length > 70
                    ? note.Text.substring(0, 70).concat("...")
                    : note.Text}
                </div>
                {/* <div className='note--tags' style={this.state.tags ? {display: 'inline'} : {display: 'none'}} onClick={this.addTags}>
                        +
                    </div>
                    <ul style={this.state.addTags ? {display: 'inline'} : {display: 'none'}}>
                    <li>Blue</li>
                    <li>Red</li>
                    </ul> */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(mapStateToProps)(Notes);
